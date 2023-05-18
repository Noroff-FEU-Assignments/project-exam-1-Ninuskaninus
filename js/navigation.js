import { getPosts } from './postData.js';


const navContainer = document.querySelector('#categories');
const navCategoriesTitle = document.createElement("h4");
navCategoriesTitle.textContent = "Categories";
navCategoriesTitle.style.color = "var(--brightPink)";
navContainer.appendChild(navCategoriesTitle); 

const categoriesMobile = document.querySelector('#hamburgerCategories');
const navCategoriesMobileTitle = document.createElement("h4");
navCategoriesMobileTitle.textContent = "Categories";
navCategoriesMobileTitle.style.color = "var(--brightPink)";
categoriesMobile.appendChild(navCategoriesMobileTitle);

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
      navCategories.style.color = "var(--brightPink)";

      
      
      categoriesMobile.appendChild(navCategories);

      const navBigScreen = document.querySelector("nav #categories");
      navBigScreen.appendChild(navCategories.cloneNode(true));
    });
  })
  .catch(error => console.error(error));




const toggleNav = document.querySelector('.hamburgerToggle');
toggleNav.style.marginTop = "-300px"
const toggleBtn = document.querySelector('.hamburgerNav');

toggleBtn.addEventListener('click', () => {
  if (toggleNav.style.marginTop === "-300px") {
    toggleNav.style.marginTop = "0px";
    toggleNav.style.transition = "all 0.5s ease-in-out";
  } else {
    toggleNav.style.marginTop = "-300px";
  }
} );
