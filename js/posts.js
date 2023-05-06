async function fetchPosts() {
  const response = await fetch("https://wpsite.codecrush.no/wp-json/wp/v2/posts?_fields=media,author,id,content.rendered,title,date,categories,_links.wp:featuredmedia");
  const posts = await response.json();
  const allPosts = [];
  await Promise.all(posts.map(async post => {
    const featuredMediaUrl = post._links['wp:featuredmedia'][0].href;
    const categoryIds = post.categories;
    const categoriesUrl = `https://wpsite.codecrush.no/wp-json/wp/v2/categories?include=${categoryIds.join(',')}&_fields=id,name`;
    const [mediaResponse, categoriesResponse] = await Promise.all([fetch(featuredMediaUrl), fetch(categoriesUrl)]);
    const [media, categories] = await Promise.all([mediaResponse.json(), categoriesResponse.json()]);
    const categoryNames = categories.map(category => category.name);
    const postObject = {
      title: post.title.rendered,
      authorId: post.author,
      date: post.date,
      id: post.id,
      categories: categoryNames,
      content: post.content.rendered,
      featuredImg: media.guid.rendered
    };
    allPosts.push(postObject);
  }));
  console.log(allPosts.content);
  return allPosts;
}


async function fetchAuthors() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/users');
    const data = await response.json();
    const authors = data;
    
    return authors;
    
  } catch (error) {
    console.error(error);
  }
  
}


async function fetchCategories() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/categories')
    const data = await response.json()
    return data.filter(category => category.id !== 1).reduce((acc, { id, name }) => {
      acc[name] = name;
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
    return {};
  }
}

export { fetchPosts };
export { fetchAuthors };
export { fetchCategories };
