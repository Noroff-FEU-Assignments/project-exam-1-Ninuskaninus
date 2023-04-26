import { fetchPosts } from './posts.js';


async function fetchCategories() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/categories')
    const data = await response.json()
    return data.filter(category => category.id !== 1).reduce((acc, { id, name }) => {
      acc[name] = name;
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
    return {};
  }
}

Promise.all([fetchPosts(), fetchCategories()])
  .then(([allPosts, categories]) => {
    
    const carouselContainer = document.querySelector(".carouselSection");
    
    const carouselHead = document.createElement("div");
    carouselHead.classList.add("carouselHead");
    const carouselHeadTitle = document.createElement("h5");
    carouselHeadTitle.textContent = "Latest posts";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    const prevButton = document.createElement("button");
    prevButton.classList.add("prevButton");
    const prevArrow = document.createElement("img");
    prevArrow.classList.add("arrow");
    prevArrow.src = "images/arrow-left.png";
    prevArrow.alt = "";
    prevButton.appendChild(prevArrow);

    const nextButton = document.createElement("button");
    nextButton.classList.add("nextButton");
    const nextArrow = document.createElement("img");
    nextArrow.classList.add("arrow");
    nextArrow.src = "images/arrow-right.png";
    nextArrow.alt = "";
    nextButton.appendChild(nextArrow);

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);

    carouselHead.appendChild(carouselHeadTitle);
    carouselHead.appendChild(buttonContainer);

    const carouselDiv = document.createElement("div");
    carouselDiv.classList.add("carousel");

    const carouselScroll = document.createElement("div");
    carouselScroll.classList.add("carouselScroll");

    const filledCircle = document.createElement("div");
    filledCircle.classList.add("scrollCircle", "filled");
    filledCircle.id = "filled";
    carouselScroll.appendChild(filledCircle);

    for (let i = 0; i < 2; i++) {
      const scrollCircle = document.createElement("div");
      scrollCircle.classList.add("scrollCircle");
      carouselScroll.appendChild(scrollCircle);
}


    carouselContainer.appendChild(carouselHead);
    carouselContainer.appendChild(carouselDiv);
    carouselContainer.appendChild(carouselScroll);

    
    

    for (let i = 0; i < 3; i++) {
      const post = allPosts[i];
      
      const postContainer = document.createElement("a");
      postContainer.classList.add("carouselItem");
      postContainer.href = `blogpost.html?id=${post.id}`;
      
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
      
      carouselDiv.appendChild(postContainer);
    }

    
    

  })
  .catch(error => console.error(error));
