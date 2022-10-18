//  Loading Catagory Data From the API
const loadCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryData(data.data.news_category))
    
    .catch(error => {
        const errorMessageContainer = document.getElementById('error-msg');
        errorMessageContainer.innerText = 'Oops! We have got some trouble. Try after some time'
    });
}

// Display Category Data in the UI
const displayCategoryData = (categories) => {
    categories.forEach(category =>{
        const newsCategory = document.getElementById('news-category');
        const categorListItem = document.createElement('ul');
        categorListItem.innerHTML = `
            <li onclick="loadCategoryId('${category.category_id}', '${category.category_name}')" class="category-list-items">${category.category_name}</li>
        `;

        newsCategory.appendChild(categorListItem);

    });
};


// Load Category Id Function
const loadCategoryId = async (category_id, categoryData) => {
    // Call Toggle Spinner Function
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNews(data.data, categoryData);
    } 
    catch (error) {
        const errorMessageContainer = document.getElementById('error-msg');
        errorMessageContainer.innerText = 'Oops! We have got some trouble. Try after some time'
    }
    finally{
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNews(data.data, categoryData);
    }
}

const getCategoryName = (categoryNewsLength, categoryName) => {
    // console.log(categoryName, categoryNewsLength);
    const totalNewsContainer = document.getElementById('total-news');
    if(categoryNewsLength > 0){
        totalNewsContainer.innerHTML = `
        <h4 class="border-1 text-danger text-center my-lg-3">${categoryNewsLength} news found in the ${categoryName} section</h4>
    `;
    }
    else{
        totalNewsContainer.innerHTML = `
        <h4 class="border-1 text-danger text-center my-lg-3">No news found in the ${categoryName} section</h4>
        `;
    }
    
}

// Display News as Category in the UI
const displayCategoryNews = (newsContainer, categoryName) => {

    // Call Get Category Name Function to get Category name and category length
    getCategoryName(newsContainer.length, categoryName);

    const showNewsContainer =document.getElementById('show-news-container');
    showNewsContainer.textContent = '';

    newsContainer.forEach( news_item => {
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
                            <p class="m-0 fw-semibold">${news_item.author.name ? news_item.author.name : 'No Information Found'}</p>
                            <p class="m-0">${news_item.author.published_date ? news_item.author.published_date : 'No Information Found'}</p>
                        </div>
                    </div>
                    <div>
                        <span><i class="fa-solid fa-eye"></i></span>
                        <span>${news_item.total_view ? news_item.total_view : 'No Information Found'}</span>
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

    // Call Toggle Spinner Function
    toggleSpinner(false);

};


// Function for loading a Modal for News
const loadModal = async (news) => {
    const url = `https://openapi.programming-hero.com/api/news/${news}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModalData(data.data[0])
    } 
    catch (error) {
        const errorMessageContainer = document.getElementById('error-msg');
        errorMessageContainer.innerText = 'Oops! We have got some trouble. Try after some time'
    }
    finally{
        const res = await fetch(url);
        const data = await res.json();
        displayModalData(data.data[0])
    }
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
    authorName.innerText = info.author.name ? info.author.name : 'No Information Found';

    const publishedDate = document.getElementById('published-date');
    publishedDate.innerText = info.author.published_date ? info.author.published_date : 'No Information Found';

    const totalView = document.getElementById('total-view');
    totalView.innerText = info.total_view ? info.total_view : 'No Information Found';

    const newsRating = document.getElementById('rating-number');
    newsRating.innerText = info.rating ? info.rating.number : 'No Information Found';

    const newsQuality = document.getElementById('news-qualtity');
    newsQuality.innerText = info.rating ? info.rating.badge : 'No Information Found';

    const trendingNews = document.getElementById('trending-news');
    
    if(info.others_info.is_trending === true){
        trendingNews.innerText = 'Trending';
    }
    else{
        trendingNews.innerText = 'None';
    }

    const detailsNews = document.getElementById('details-news');
    detailsNews.innerText = info.details ? info.details : 'No Information Found';
}

// Toggle Spinner Function
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner-container');

    if(isLoading === true){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}


// Calling the Category Function to load data
loadCategory();