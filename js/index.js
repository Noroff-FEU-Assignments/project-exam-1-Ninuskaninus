import { getPosts } from "./postData.js";

const loader = document.querySelector(".loader");
loader.style.display = "block";

getPosts()
    .then(posts => {
    const featuredPost = posts.filter(post => post.tags.includes(9));

    const indexHero = document.querySelector(".indexHero");
    indexHero.style.backgroundImage = `url(${featuredPost[0].image})`;
    const indexHeroContent = document.querySelector(".indexHeroContent");
    const featuredHeading = document.createElement("h1");
    featuredHeading.textContent = featuredPost[0].title;
    indexHeroContent.appendChild(featuredHeading);

    const featuredAuthor = document.createElement("p");
    featuredAuthor.textContent = 'Author:' + ' ' + featuredPost[0].author
    indexHeroContent.appendChild(featuredAuthor);

    const featuredLink = document.createElement("a");
    featuredLink.textContent = 'Read more';
    featuredLink.href = `post.html?id=${featuredPost[0].id}`;
    indexHeroContent.appendChild(featuredLink);

    loader.style.display = "none";
    });

    




      