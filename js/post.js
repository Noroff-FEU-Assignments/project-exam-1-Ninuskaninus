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

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");



getPosts(postId)
  .then(post => {
    const browserTitle = document.querySelector("title");
    browserTitle.textContent = post.title;

    const postHead = document.querySelector(".postHead");
    postHead.style.backgroundImage = `url(${post.image})`;

    const postHeadContent = document.createElement("div");
    postHeadContent.classList.add("postHeadContent");
    postHead.appendChild(postHeadContent);


   
  })
  .catch(error => console.error(error));


  