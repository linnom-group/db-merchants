const perPage = 3; // Number of blogs to show per page
let currentPage = 1; // Current page number

// Get the blog data from the JSON file
fetch('blog.json')
  .then(response => response.json())
  .then(data => {
    // Calculate the total number of pages based on the number of blogs and the number of blogs per page
    const totalPages = Math.ceil(data.length / perPage);
    
    // Function to display the blogs for the current page
    const displayBlogs = () => {
      // Get the blogs for the current page
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      const blogs = data.slice(startIndex, endIndex);

      // Display the blogs
      const blogList = document.getElementById('blog-list');
      blogList.innerHTML = '';
      blogs.forEach(blog => {
        const blogHTML = `
          <div class="blog blog--two mb--50 item">
            <div class="blog__inner">
              <div class="blog__media">
                <figure class="blog__thumb">
                  <img src="${blog.img}" alt="Blog">
                  <a href="single-blog.html?id=${blog.id}" class="overlay-link">${blog.title}</a>
                </figure>
              </div>
              <div class="blog__content">
                <header class="blog__header"> 
                  <a class="blog__category" >${blog.category}</a>
                  <h3 class="blog__title">
                    <a href="single-blog.html?id=${blog.id}">${blog.title}</a>
                  </h3>
                  <div class="blog__meta">
                    <div class="blog__meta-item">
                      <a >${blog.date}</a>
                    </div>
                    
                  </div>
                </header>
                <p class="blog__excerpt">
                  ${blog.description}
                </p>
                <footer class="blog__footer">
                  <a href="single-blog.html?id=${blog.id}" class="blog__btn"><span>Read More <i data-feather="chevron-right"></i></span> </a>
                </footer>
              </div>
            </div>
          </div>
        `;
        blogList.innerHTML += blogHTML;
      });
    };

	const displayPagination = () => {
  // Get the pagination element
  const pagination = document.getElementById('pagination');

  // Generate the pagination links
  let paginationHTML = '';
  paginationHTML += `
    <nav class="pagination-wrap">
      <ul class="pagination">
        <li class="pagination__item${currentPage === 1 ? ' ' : ''}">
          <a class="pagination__link pagination__link--prev prev-button" href="#">
            <i data-feather="chevron-left"></i>
            <span>prev</span>
          </a>
        </li>
  `;
  for (let i = 1; i <= totalPages; i++) {
    const activeClass = (i === currentPage) ? 'active' : '';
    paginationHTML += `<li class="pagination__item"><a class="pagination__link ${activeClass}" href="#"><span>${i}</span></a></li>`;
  }
  paginationHTML += `
        <li class="pagination__item${currentPage === totalPages ? ' disabled' : ''}">
          <a class="pagination__link pagination__link--next next-button" href="#">
            <span>next</span>
            <i data-feather="chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  `;
  pagination.innerHTML = paginationHTML;

  // Add click event listeners to the pagination links
  const prevButton = document.querySelector('.prev-button');
  if (prevButton) {
    prevButton.addEventListener('click', event => {
      event.preventDefault();
      if (currentPage > 1) {
        currentPage -= 1;
        displayBlogs();
        displayPagination();
      }
    });
  }
  const nextButton = document.querySelector('.next-button');
  if (nextButton) {
    nextButton.addEventListener('click', event => {
      event.preventDefault();
      if (currentPage < totalPages) {
        currentPage += 1;
        displayBlogs();
        displayPagination();
      }
    });
  }
  const paginationLinks = document.querySelectorAll('.pagination__link:not(.prev-button):not(.next-button)');
  paginationLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      currentPage = parseInt(event.target.innerText);
      displayBlogs();
      displayPagination();
    });
  });

  // Display the page indicator
  const pageIndicator = document.querySelector('.page-indicator');
  if (pageIndicator) {
    const firstPage = (currentPage - 1) * perPage + 1;
    const lastPage = Math.min(currentPage * perPage, data.length);
    const pageIndicatorHTML = `Showing ${firstPage}-${lastPage} of ${data.length} blogs`;
    pageIndicator.innerText = pageIndicatorHTML;
  }
};

    
    // Display the initial blogs and pagination
    displayBlogs();
    displayPagination();
  });
