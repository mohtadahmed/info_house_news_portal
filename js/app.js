//  Loading Catagory Data From the API
const loadCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryData(data.data.news_category))
}

// Display Category Data in the UI
const displayCategoryData = categories => {
    // console.log(categories)
    categories.forEach(category =>{
        const newsCategory = document.getElementById('news-category');
        const categorListItem = document.createElement('ul');
        categorListItem.innerHTML = `
            <li onclick="loadCategoryId('${category.category_id}')" class="category-list-items">${category.category_name}</li>
        `;

        newsCategory.appendChild(categorListItem);
    });
};


// Load Category Id Function
const loadCategoryId = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryNews(data.data);
}


// Display News as Category in the UI
const displayCategoryNews = newsContainer => {
    // console.log(news);
    newsContainer.forEach( news_item => {
        const showNewsContainer =document.getElementById('show-news-container');
        const showAllNewsByCategory = document.createElement('div');
        showAllNewsByCategory.classList.add('card', 'my-5');
        showAllNewsByCategory.innerHTML = `
        <div class="container d-lg-flex flex-lg-row p-lg-4">
            <img src="${news_item.thumbnail_url}" class="img-fluid rounded-start me-lg-2" alt="...">
            <div class="card-body d-flex flex-column justify-content-lg-between">
                <h4 class="card-title">${news_item.title}</h4>
                <p class="card-text text-color">${news_item.details.slice(0, 350)}...</p>
                
                <div class="news-info-container d-lg-flex align-items-center justify-content-between mt-lg-5 mt-2 border-top p-3">
                    <div class="d-flex justify-content-around align-items-center mb-lg-0 mb-2">
                        <div class="me-2">
                            <img src="${news_item.author.img}" height="40" width="40" class="rounded-circle">
                        </div>
                        <div class="author-details">
                            <p class="m-0 fw-semibold">${news_item.author.name}</p>
                            <p class="m-0">${news_item.author.published_date}</p>
                        </div>
                    </div>
                    <div>
                        <span><i class="fa-solid fa-eye"></i></span>
                        <span>${news_item.total_view}</span>
                    </div>
                    <div class="mb-lg-0 mb-2">
                        <span><i class="fa-solid fa-star-half-stroke"></i></span>
                        <span><i class="fa-regular fa-star"></i></span>
                        <span><i class="fa-regular fa-star"></i></span>
                        <span><i class="fa-regular fa-star"></i></span>
                        <span><i class="fa-regular fa-star"></i></span>                        
                    </div>
                    <div>
                        <button onclick="loadModal('${news_item._id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        showNewsContainer.appendChild(showAllNewsByCategory);
    });
};


// Function for loading a Modal for News
const loadModal = async (news) => {
    const url = `https://openapi.programming-hero.com/api/news/${news}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalData(data.data[0])
}

// Display Modal Data to the UI
const displayModalData = info => {
    const modalTitle = document.getElementById('newsModalTitle');
    modalTitle.innerText = info.title;

    const newsPicture = document.getElementById('news-img');
    newsPicture.innerHTML = `
        <img class="img-fluid" src="${info.image_url}">
    `;

    const authorName = document.getElementById('author-name');
    authorName.innerText = info.author.name;

    const publishedDate = document.getElementById('published-date');
    publishedDate.innerText = info.author.published_date;

    const totalView = document.getElementById('total-view');
    totalView.innerText = info.total_view;

    const newsRating = document.getElementById('rating-number');
    newsRating.innerText = info.rating.number;

    const newsQuality = document.getElementById('news-qualtity');
    newsQuality.innerText = info.rating.badge;

    const trendingNews = document.getElementById('trending-news');
    
    if(info.others_info.is_trending === true){
        trendingNews.innerText = 'Trending';
    }
    else{
        trendingNews.innerText = 'None';
    }

    

    const detailsNews = document.getElementById('details-news');
    detailsNews.innerText = info.details;
}


// Calling the Category Function to load data
loadCategory();