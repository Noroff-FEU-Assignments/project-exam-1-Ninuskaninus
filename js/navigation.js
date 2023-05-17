import { getPosts } from './postData.js';


const navContainer = document.querySelector('#categories');
const navCategoriesTitle = document.createElement("h4");
navCategoriesTitle.textContent = "Categories";
navCategoriesTitle.style.color = "var(--brightPink)";
navContainer.appendChild(navCategoriesTitle); 

getPosts()
  .then(posts => {
    const categories = {};
    posts.forEach(post => {
      post.category.split(', ').forEach(category => {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(post);
      });
    });
    Object.keys(categories).forEach(category => {
      const navCategories = document.createElement("a");
      navCategories.href = `category.html?category=${category}`;
      navCategories.textContent = category;
      navCategories.style.color = "var(--brightPink)"
      
     
      navContainer.appendChild(navCategories);
    });
  })
  .catch(error => console.error(error));
