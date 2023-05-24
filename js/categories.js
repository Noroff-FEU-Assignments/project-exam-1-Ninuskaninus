import { getPosts } from './postData.js';

getPosts().then(posts => {
  const postsSection = document.querySelector(".categoryPosts");
  const postContainer = document.createElement("div");
  postContainer.classList.add("categoryPostContainer");
  postsSection.appendChild(postContainer);

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  const categoryHeader = document.querySelector(".categoriesHead");
  const categoryHeaderTitle = document.createElement("h1");
  categoryHeaderTitle.textContent = category;
  categoryHeader.appendChild(categoryHeaderTitle);

  const filteredPosts = posts.filter(post => post.category === category);

  for (let i = 0; i < filteredPosts.length; i++) {
    const post = filteredPosts[i];

    const postItem = document.createElement("a");
    postItem.href = `post.html?id=${post.id}`;
    postItem.classList.add("categoryPostItem");
    postContainer.appendChild(postItem);

    const postSpan = document.createElement("span");
    postSpan.classList.add("line");
    postContainer.appendChild(postSpan);

    const postImg = document.createElement("img");
    postImg.src = post.image;
    postItem.appendChild(postImg);

    const postTitle = document.createElement("h6");
    postTitle.textContent = post.title;
    postItem.appendChild(postTitle);
  }
});
