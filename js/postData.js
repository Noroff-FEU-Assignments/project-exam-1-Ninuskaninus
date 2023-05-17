const url = 'https://wpsite.codecrush.no/wp-json/wp/v2/posts?_embed=true';

const getPosts = () => {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const posts = data.map(post => {
        const categoryNames = post._embedded['wp:term'][0].map(category => category.name).join(', ');
        const date = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const authorName = post._embedded.author[0].name;
        return {
          title: post.title.rendered,
          content: post.content.rendered,
          image: post._embedded['wp:featuredmedia'][0].source_url,
          date: date,
          author: authorName,
          category: categoryNames,
          categoryID: post._embedded['wp:term'][0][0].id,
          link: post.link,
          tags: post.tags,
          slug: post.slug,
        };
      });
      return posts;
    })
    .catch(error => console.error(error));
};

export { getPosts };
