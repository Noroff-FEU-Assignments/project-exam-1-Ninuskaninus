function fetchPosts() {
    return fetch("https://wpsite.codecrush.no/wp-json/wp/v2/posts?_fields=media,author,id,content,title,date,categories,_links.wp:featuredmedia")
      .then(response => response.json())
      .then(posts => {
        const allPosts = [];
        return Promise.all(posts.map(post => {
          const featuredMediaUrl = post._links['wp:featuredmedia'][0].href;
          const categoryIds = post.categories;
          const categoriesUrl = `https://wpsite.codecrush.no/wp-json/wp/v2/categories?include=${categoryIds.join(',')}`;
          return Promise.all([fetch(featuredMediaUrl), fetch(categoriesUrl)])
            .then(([mediaResponse, categoriesResponse]) => Promise.all([mediaResponse.json(), categoriesResponse.json()]))
            .then(([media, categories]) => {
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
            });
        })).then(() => allPosts);
      });
  }
  
  export { fetchPosts };
  