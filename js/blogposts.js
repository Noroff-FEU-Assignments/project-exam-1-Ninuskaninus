import { fetchContent, fetchPosts, fetchCategories, fetchAuthors } from './posts.js';



const likeButton = document.querySelector(".blogpostLike button img");
let likeCount = 0;
const likeCounter = document.createElement("p");
const postInfo = document.querySelector(".post-info");
likeCounter.textContent = `> Likes: ${likeCount}`;
likeCounter.id = "infoBlue";

likeButton.addEventListener("click", () => {
  if (likeButton.getAttribute("src") === "images/heartline.png") {
    likeButton.setAttribute("src", "images/heartfull.png");
    console.log("This has been clicked")
    likeCount++;
  } else{
    likeButton.setAttribute("src", "images/heartline.png");
    likeCount--;
  }
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


    const postCategories = document.createElement("h5");
    postCategories.textContent = `${post.categories.join(", ")}`;
    postCategories.href = `href="categories.html?${categories.id}"`
    

    
    
    
    
    
    postInfo.appendChild(postAuthor); 
    postInfo.appendChild(postPublished);
    postInfo.appendChild(likeCounter);
    postInfo.appendChild(postCategories);

    
    
  
  
  

 
  
});


