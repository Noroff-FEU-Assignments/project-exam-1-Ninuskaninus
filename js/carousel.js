import { getPosts } from "./postData.js";

getPosts().then(posts => {
    const carouselContainer = document.querySelector(".carouselContainer");
    const carouselHead = document.createElement("div");
    carouselHead.classList.add("carouselHead");
    
    carouselContainer.appendChild(carouselHead);

    const carouselHeadline = document.createElement("h3");
    carouselHeadline.textContent = 'Latest posts';
    carouselHead.appendChild(carouselHeadline);

    const carouselBtnContainer = document.createElement("div");
    carouselBtnContainer.classList.add("carouselBtnContainer");
    carouselHead.appendChild(carouselBtnContainer);

    const btnLeft = document.createElement("button");
    btnLeft.id = "btnLeft";
    btnLeft.style.visibility = 'hidden';
    const imgLeft = document.createElement("img");
    imgLeft.src = "images/arrow-left.png";
    imgLeft.alt = "";
    btnLeft.appendChild(imgLeft);
    carouselBtnContainer.appendChild(btnLeft);

    const btnRight = document.createElement("button");
    btnRight.id = "btnRight";
    const imgRight = document.createElement("img");
    imgRight.src = "images/arrow-right.png";
    imgRight.alt = "";
    btnRight.appendChild(imgRight);
    carouselBtnContainer.appendChild(btnRight);

    const carousel = document.createElement("div");
    carousel.classList.add("carousel");
    carouselContainer.appendChild(carousel);

    const carouselTrack = document.createElement("div");
    carouselTrack.classList.add("carouselTrack");
    carouselContainer.appendChild(carouselTrack);
    carousel.appendChild(carouselTrack);
   

const numPosts = Math.min(posts.length, 6); 

for (let i = 0; i < numPosts; i++) {
  const post = posts[i];

  const carouselItem = document.createElement("a");
  carouselItem.href = `post.html?id=${post.id}`;
  carouselItem.classList.add("carouselItem");
  carousel.appendChild(carouselItem);

  const carouselImg = document.createElement("div");
  carouselImg.classList.add("carouselImg");
  carouselImg.style.backgroundImage = `url(${post.image})`;
  carouselItem.appendChild(carouselImg);

  const itemWidth = carouselImg.offsetWidth * 1.18;
  let currentOffset = 0;
  let trackWidth = itemWidth * posts.length;
  carouselTrack.style.maxWidth = `${trackWidth}px`;

  
  if (window.innerWidth < 390) {
    const itemWidth = carouselItem.offsetWidth; 
    let trackWidth = itemWidth * posts.length;
    carouselTrack.style.maxWidth = `${trackWidth}px`;
}
  
  btnRight.addEventListener('click', () => {
    if (currentOffset < trackWidth - carouselContainer.offsetWidth) {
      currentOffset += itemWidth;
        btnLeft.style.visibility = 'visible';
    } 
    carouselTrack.style.marginLeft = `-${currentOffset}px`;
    carouselTrack.style.transition = 'all 0.5s ease-in-out';
  });
  
  btnLeft.addEventListener('click', () => {
    if (currentOffset > 0) {
      currentOffset -= itemWidth;
      
    }
    carouselTrack.style.marginLeft = `-${currentOffset}px`;
    carouselTrack.style.transition = 'all 0.5s ease-in-out';
  });

  const carouselCategoryContainer = document.createElement("div");
  carouselCategoryContainer.classList.add("carouselCategories");
  carouselItem.appendChild(carouselCategoryContainer);

  const categoryNames = post.category.split(", ");

  categoryNames.forEach(categoryName => {
    const carouselCategory = document.createElement("a");
    carouselCategory.textContent = categoryName + " ";
    carouselCategory.href = `category.html?id=${categoryName}`;
    carouselCategoryContainer.appendChild(carouselCategory);
  });

  const carouselTitle = document.createElement("h6");
  carouselTitle.textContent = post.title;
  carouselItem.appendChild(carouselTitle);
}
});



