async function fetchCategories() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/categories')
    const data = await response.json()
    const categories = data
      .filter(category => category.id !== 1) 
      .map(({ id, name }) => ({ id, name }));

    const categoryContainer = document.querySelector("#categoriesPink");
    for (let i = 0; i < categories.length; i++) {
      const link = document.createElement('a');
      link.textContent = categories[i].name;
      link.id = ('pink');
      link.href = `categories.html?id=${categories[i].id}`;
      categoryContainer.appendChild(link);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchCategories();


