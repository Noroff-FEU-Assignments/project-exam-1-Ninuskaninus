import { fetchContent, fetchPosts, fetchCategories, fetchAuthors } from './posts.js';


const likebutton = document.querySelector(".blogpostLike button img");
likebutton.addEventListener("click", () => {
  if (likebutton.getAttribute("src") === "images/heartline.png") {
    likebutton.setAttribute("src", "images/heartfull.png");
  } else{
    likebutton.setAttribute("src", "images/heartline.png");
  }
  const likeCounter = document.createElement("p");
  likeCounter.id = ""
});

const menubutton = document.querySelector(".menuBtnToggle button");
const menuToggle = document.querySelector("#toggleNav");
const menuButtonClose = document.querySelector(".navContent button");
menubutton.addEventListener("click", () => {
  if (menuToggle.style.display = "block")
      menubutton.style.display = "none";
});
menuButtonClose.addEventListener("click", () => {
   menuToggle.style.display = "none"
   menubutton.style.display = "block"

});

Promise.all([fetchPosts(), fetchCategories(), fetchContent(), fetchAuthors()])
.then(([allPosts, categories, allContent, allAuthors]) => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const contentId = urlParams.get('id');
  const authorId = urlParams.get('id');
  const post = allPosts.find(post => post.id == postId);
  const content = allContent.find(content => content.id == contentId);
  
  
  

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
    postAuthor.textContent = `> Written by: ${allAuthors.name}`
    postAuthor.id = "infoGreen";
    
    const postPublished = document.createElement("p");
    postPublished.textContent = `> Published: ${post.date}`;
    postPublished.id ="infoYellow";
    
    
    
    
    
    postInfo.appendChild(postAuthor); 
    postInfo.appendChild(postPublished);

    
    
  
  
  

 
  
});


