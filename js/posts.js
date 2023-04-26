async function fetchPosts() {
  const response = await fetch("https://wpsite.codecrush.no/wp-json/wp/v2/posts?_fields=media,author,id,content,title,date,categories,_links.wp:featuredmedia");
  const posts = await response.json();
  const allPosts = [];
  await Promise.all(posts.map(async post => {
    const featuredMediaUrl = post._links['wp:featuredmedia'][0].href;
    const categoryIds = post.categories;
    const categoriesUrl = `https://wpsite.codecrush.no/wp-json/wp/v2/categories?include=${categoryIds.join(',')}&_fields=id,name`;
    // Notice we added &_fields=id,name to include only these fields in the response
    const [mediaResponse, categoriesResponse] = await Promise.all([fetch(featuredMediaUrl), fetch(categoriesUrl)]);
    const [media, categories] = await Promise.all([mediaResponse.json(), categoriesResponse.json()]);
    const categoryNames = categories.map(category => category.name);
    const postObject = {
      title: post.title.rendered,
      date: post.date,
      id: post.id,
      categories: categoryNames,
      content: post.content.rendered,
      featuredImg: media.guid.rendered
    };
    allPosts.push(postObject);
  }));
  return allPosts;
}

export { fetchPosts };
