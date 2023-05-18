import { getPosts } from "./postData.js";

const menubutton = document.querySelector(".menuBtn");
const menuToggle = document.querySelector(".postsNavHide");
const menuButtonClose = document.querySelector(".postsNavHide button");

menubutton.addEventListener("click", () => {
  if (menuToggle.style.marginLeft = "0px")
      menuToggle.style.transition = "all 0.5s ease-in-out";
      menubutton.style.display = "none";
      menubutton.style.transition = "all 0.5s ease-in-out";
});
menuButtonClose.addEventListener("click", () => {
   menuToggle.style.marginLeft = "-300px"
   menuToggle.style.transition = "all 0.5s ease-in-out";
   menubutton.style.display = "block"
   menubutton.style.transition = "all 0.5s ease-in-out";
});

getPosts().then(posts => {
    const selectedPost = posts.find(post => post.id === parseInt(location.search.split("=")[1]));
    const blogheader = document.querySelector(".postHead");
    blogheader.style.backgroundImage = `url(${selectedPost.image})`;

    const blogHeadContainer = document.createElement("div");
    blogHeadContainer.classList.add("postHeadContent");
    blogheader.appendChild(blogHeadContainer);

    const author = document.createElement("p");
    author.id = "blue";
    author.textContent = `> Written by ${selectedPost.author}`;
    blogHeadContainer.appendChild(author);

    const date = document.createElement("p");
    date.id = "yellow";
    date.textContent = `> Posted: ${selectedPost.date}`;
    blogHeadContainer.appendChild(date);

    const likes = document.createElement("p");
    likes.id = "pink";
    likes.textContent = `> Likes: 1500`;
    blogHeadContainer.appendChild(likes);

    const blogPost = document.querySelector(".blogPost");
    const blogTitle = document.createElement("h1");
    blogTitle.textContent = selectedPost.title;
    blogPost.appendChild(blogTitle);

    const blogContent = document.createElement("div");
    blogContent.classList.add("blogContent");

const codeContent = selectedPost.content;
const highlightedContent = codeContent.replace(/(const|let|var)/g, '<span class="keyword">$1</span>');

    blogContent.innerHTML = selectedPost.content;
    blogPost.appendChild(blogContent);
});

document.addEventListener("DOMContentLoaded", function() {
    // Wait for the DOM to be fully loaded before executing the code
  
    const copyButton = document.querySelector(".wp-block-buttons");
    const copyCode = document.querySelector("code");
  
    if (copyButton && copyCode) {
      // Check if both elements are present in the DOM
  
      copyButton.style.color = "blue";
  
      copyButton.addEventListener("click", function() {
        copyCode.select();
        document.execCommand("copy");
        alert("Code copied to clipboard!");
      });
    }
  });
  











  