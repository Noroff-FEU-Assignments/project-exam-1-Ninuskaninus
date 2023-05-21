import { getPosts } from "./postData.js";

getPosts().then(posts => {
  const categoryContainer = document.querySelector(".categoryContainer");
  const categoryItems = document.createElement("div");
  categoryItems.classList.add("categoryItems");
  categoryContainer.appendChild(categoryItems);

  let btnCount = 1; 

  const allCategories = posts.reduce((categories, post) => {
    post.category.split(", ").forEach(category => {
      if (!categories.includes(category)) {
        categories.push(category);
        const categoryBtn = document.createElement("a");
        categoryBtn.classList.add("categoryBtn");
        categoryBtn.href = `category.html?category=${category}`;
        categoryBtn.textContent = category;

        
        categoryBtn.id = `btn-${btnCount}`;

        categoryItems.appendChild(categoryBtn);
        btnCount++;
      }
    });
    return categories;
  }, []);
});


getPosts().then(posts => {
  const postsSection = document.querySelector(".allPosts");
  const postsContainer = document.createElement("div");
  postsContainer.classList.add("postsContainer");
  postsSection.appendChild(postsContainer);

  const seeMoreContainer = document.createElement("div");
  seeMoreContainer.classList.add("seeMoreContainer");
  postsSection.appendChild(seeMoreContainer);

  const seeMoreBtn = document.createElement("button");
  seeMoreBtn.textContent = "See more";
  seeMoreContainer.appendChild(seeMoreBtn);

 

  let numPosts = 10;

  seeMoreBtn.addEventListener("click", () => {
    if (numPosts === 10) {
      numPosts += 2;
      seeMoreBtn.textContent = "See Less";
    } else {
      numPosts = 10;
      seeMoreBtn.textContent = "See More";
    }
    renderPosts();
  });
  
  
  function renderPosts() {
    postsContainer.innerHTML = ""; 
  
    for (let i = 0; i < numPosts && i < posts.length; i++) {
      const post = posts[i];
      const postContainer = document.createElement("a");
      postContainer.href = `post.html?id=${post.id}`;
      postContainer.classList.add("postContainer");
      postsContainer.appendChild(postContainer);
  
      const postImg = document.createElement("div");
      postImg.classList.add("postImg");
      postImg.style.backgroundImage = `url(${post.image})`;
      postContainer.appendChild(postImg);
  
      const postContent = document.createElement("div");
      postContent.classList.add("postContent");
      postContainer.appendChild(postContent);
  
      const postCategory = document.createElement("a");
      postCategory.href = `category.html?category=${post.category}`;
      postCategory.textContent = post.category;
      postContent.appendChild(postCategory);
  
      const postTitle = document.createElement("h6");
      postTitle.classList.add("postTitle");
      postTitle.textContent = post.title;
      postContent.appendChild(postTitle);
    }
  }
  
  renderPosts();
  






  


});

