async function fetchData() {
    try {
      const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/categories')
      const data = await response.json()
      const categories = data
        .filter(category => category.id !== 1) 
        .map(({ id, name }) => ({ id, name }));
      const links = document.querySelectorAll('a#pink')
      links.forEach((link, index) => {
        link.textContent = categories[index].name
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  fetchData()
  