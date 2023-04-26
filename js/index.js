import { fetchPosts } from './posts.js';

async function fetchCategories() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/categories')
    const data = await response.json()
    return data.filter(category => category.id !== 1).reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
    return {};
  }
}

Promise.all([fetchPosts(), fetchCategories()])
  .then(([allPosts, categories]) => {
    console.log(allPosts);
    console.log(categories);

    const carouselContainer = document.querySelector(".carousel");

    for (let i = 0; i < 3; i++) {
      const post = allPosts[i];
      
      const postContainer = document.createElement("div");
      postContainer.classList.add("carouselItem");
      
      const postImage = document.createElement("div");
      postImage.classList.add("carouselImg");
      postImage.style.backgroundImage = `url(${post.featuredImg})`;
      postContainer.appendChild(postImage);
      
      const postCategories = document.createElement("div");
      postCategories.classList.add("carouselCategories");
      postContainer.appendChild(postCategories);
      
      post.categories.forEach(categoryId => {
        const categoryTitle = document.createElement("h5");
        categoryTitle.textContent = categories[categoryId];
        postCategories.appendChild(categoryTitle);
      });
      
      const postTitle = document.createElement("h6");
      postTitle.textContent = post.title;
      postContainer.appendChild(postTitle);
      
      carouselContainer.appendChild(postContainer);

      

    }

    const carouselSection = document.querySelector(".carouselSection");
    carouselSection.appendChild(carouselContainer);
    const carouselScroll = document.querySelector(".carouselScroll");
    carouselSection.appendChild(carouselScroll);

  })
  .catch(error => console.error(error));
