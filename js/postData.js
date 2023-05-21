const url = 'https://wpsite.codecrush.no/wp-json/wp/v2/posts?_embed=true';

const getPosts = async () => {
  let allPosts = [];
  let pageNumber = 1;
  let totalPages = 1;

  while (pageNumber <= totalPages) {
    const response = await fetch(`${url}&page=${pageNumber}`);
    const data = await response.json();

    totalPages = response.headers.get('X-WP-TotalPages');

    const posts = data.map(post => {
      const categoryNames = post._embedded['wp:term'][0].map(category => category.name).join(', ');
      const date = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const authorName = post._embedded.author[0].name;
      const contentDOM = new DOMParser().parseFromString(post.content.rendered, 'text/html');
      const imgElements = contentDOM.querySelectorAll('figure');
      const imageSources = Array.from(imgElements).map(img => img.src);

      return {
        title: post.title.rendered,
        content: post.content.rendered,
        images: imageSources,
        image: post._embedded['wp:featuredmedia'][0].source_url,
        date: date,
        author: authorName,
        category: categoryNames,
        categoryID: post._embedded['wp:term'][0][0].id,
        link: post.link,
        tags: post.tags,
        slug: post.slug,
        id: post.id
      };
    });

    allPosts = allPosts.concat(posts);
    pageNumber++;
  }

  return allPosts;
};

export { getPosts };
