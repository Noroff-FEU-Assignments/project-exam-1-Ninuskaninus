import { fetchPosts } from './posts.js';

async function fetchButtons() {
    try {
      const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/categories')
      const data = await response.json()
      const categories = data
        .filter(category => category.id !== 1) 
        .map(({ id, name }) => ({ id, name }));
  
      const blogCategoryContainer = document.querySelector(".blogsCategories");
      for (let i = 0; i < categories.length; i++) {
        const categoryName = document.createElement("button");
        categoryName.textContent = categories[i].name;
        categoryName.id = `categoryButton-${categories[i].id}`;
        blogCategoryContainer.appendChild(categoryName);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchButtons();

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
      
      const allPostsSection = document.querySelector(".allPostsSection");
      const allPostsContainer = document.createElement("div");
      allPostsContainer.classList.add("allPostsContainer");

      allPostsSection.appendChild(allPostsContainer)
      
      for (let i = 0; i < 10; i++) {
        const post = allPosts[i];
        
        const allPostsItem = document.createElement("a");
        allPostsItem.classList.add("carouselItem");
        allPostsItem.href = `blogpost.html?id=${post.id}`;
        
        const postImage = document.createElement("div");
        postImage.classList.add("carouselImg");
        postImage.style.backgroundImage = `url(${post.featuredImg})`;
        allPostsItem.appendChild(postImage);
        
        const postCategories = document.createElement("div");
        postCategories.classList.add("carouselCategories");
        allPostsItem.appendChild(postCategories);
        
        post.categories.forEach(categoryId => {
          const categoryTitle = document.createElement("h5");
          categoryTitle.textContent = categories[categoryId];
          postCategories.appendChild(categoryTitle);
        });
        
        const postTitle = document.createElement("h6");
        postTitle.textContent = post.title;
        allPostsItem.appendChild(postTitle);
        
        allPostsContainer.appendChild(allPostsItem);
      }
  
    })
    .catch(error => console.error(error));
