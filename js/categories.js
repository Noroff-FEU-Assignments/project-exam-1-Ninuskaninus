// Import post data from getPosts       .js
import { getPosts        } from './getPosts       .js';

// Function to display the posts based on the selected category
function displayCategoryPosts(categoryId) {
    const categoryPostContainer = document.getElementById('categoryPostContainer');
    categoryPostContainer.innerHTML = ''; // Clear the existing content

    // Filter the post data based on the selected category
    const posts = getPosts       .filter(post => post.category === categoryId);

    // Iterate over the filtered posts and create HTML elements dynamically
    posts.forEach(post => {
        const categoryPostItem = document.createElement('div');
        categoryPostItem.className = 'categoryPostItem';

        const image = document.createElement('img');
        image.src = post.image;
        image.alt = '';

        const title = document.createElement('h6');
        title.textContent = post.title;

        categoryPostItem.appendChild(image);
        categoryPostItem.appendChild(title);
        categoryPostContainer.appendChild(categoryPostItem);
    });
}

// Example usage: You can call this function when a category is clicked
displayCategoryPosts('category1');
