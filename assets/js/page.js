
// Get the ID of the blog post from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

// Fetch the blog post data from the JSON file
fetch('blog.json')
  .then(response => response.json())
  .then(data => {
    const blogPost = data.find(post => post.id === id);
    // Use the blogPost object to update the HTML elements
    const blogTitle = document.querySelector('.single-blog__title');
    blogTitle.textContent = blogPost.title;

    const blogCategory = document.querySelector('.single-blog__category');
    blogCategory.textContent = blogPost.category;

    const blogDate = document.querySelector('.single-blog__date');
    blogDate.textContent = blogPost.date;

    const blogAuthor = document.querySelector('.single-blog__author');
    blogAuthor.textContent = blogPost.author;

    const blogComments = document.querySelector('.single-blog__comment-numb');
    blogComments.textContent = blogPost.comments + ' Comments';

    const blogImage = document.querySelector('.single-blog__thumb img');
    blogImage.src = blogPost.img;

    const blogDescription = document.querySelector('.single-blog__content p');
    blogDescription.textContent = blogPost.description;

    const blogStory = document.querySelector('.single-blog__content p');
    blogStory.textContent = blogPost.story;
  })
  .catch(error => console.log(error));
