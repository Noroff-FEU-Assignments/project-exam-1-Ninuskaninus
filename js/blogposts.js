import { fetchPosts } from './posts.js';
import { fetchCategories } from './posts.js';



const likebutton = document.querySelector(".blogpostLike button img");
likebutton.addEventListener("click", () => {
  if (likebutton.getAttribute("src") === "images/heartline.png") {
    likebutton.setAttribute("src", "images/heartfull.png");
  } else{
    likebutton.setAttribute("src", "images/heartline.png");
  }
});

Promise.all([fetchPosts(), fetchCategories()])
.then(([allPosts, categories]) => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const post = allPosts.find(post => post.id == postId);
  
  const postHero = document.querySelector(".blogpostHero");
  postHero.classList.add("blogpostHero");
  postHero.style.backgroundImage = `url(${post.featuredImg})`;
  const postInfo = document.createElement("div");
  postInfo.classList.add("blogpostInfo");
  postHero.appendChild(postInfo);

  const postFullpost = document.querySelector(".blogPostSection");
  const postHeading = document.createElement("h1");
  postHeading.textContent = post.title;
  
  postFullpost.appendChild(postHeading);

  const postAuthor = document.createElement("p");
  postAuthor.textContent = "This is a test";
  postAuthor.id = "infoGreen";

  const postContent = document.createElement("p");
postContent.textContent = post.content.rendered;

  
  postInfo.appendChild(postAuthor);

  
});
