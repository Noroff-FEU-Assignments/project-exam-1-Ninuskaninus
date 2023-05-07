async function fetchPosts() {
  const response = await fetch("https://wpsite.codecrush.no/wp-json/wp/v2/posts?_fields=media,author,id,content.rendered,title,date,categories,_links.wp:featuredmedia");
  const posts = await response.json();
  const allPosts = [];
  await Promise.all(posts.map(async post => {
    const featuredMediaUrl = post._links['wp:featuredmedia'][0].href;
    const categoryIds = post.categories;
    const categoriesUrl = `https://wpsite.codecrush.no/wp-json/wp/v2/categories?include=${categoryIds.join(',')}&_fields=id,name`;
    const [mediaResponse, categoriesResponse] = await Promise.all([fetch(featuredMediaUrl), fetch(categoriesUrl)]);
    const [media, categories,] = await Promise.all([mediaResponse.json(), categoriesResponse.json()]);
    const categoryNames = categories.map(category => category.name);
    const postObject = {
      title: post.title.rendered,
      authorId: post.author,
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      id: post.id,
      categories: categoryNames,
      content: post.content.rendered,
      featuredImg: media.guid.rendered
    };
    allPosts.push(postObject);
  }));
  console.log(allPosts);
  return allPosts;
}


async function fetchAuthors() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/users');
    const data = await response.json();
    const authors = data;
    
      const allAuthors = {
        name: authors[0].name,
        id: authors[0].id
      };
    
    return allAuthors;
    
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

async function fetchContent() {
  try {
    const response = await fetch('https://wpsite.codecrush.no/wp-json/wp/v2/posts?_fields=content.rendered');
    const data = await response.json();
    const allContent = data.map(post => {
      return { content: post.content.rendered };
    });
    return allContent; 
  } catch (error) {
    console.log(error);
  }
};







export { fetchPosts };
export { fetchAuthors };
export { fetchCategories };
export { fetchContent };
