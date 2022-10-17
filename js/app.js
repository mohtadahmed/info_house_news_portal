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
        const categorListItem = document.createElement('li');
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
const displayCategoryNews = news => {
    // console.log(news);
    news.forEach( news_item => {
        const showNewsContainer =document.getElementById('show-news-container');
        const showAllNewsByCategory = document.createElement('div');
        showAllNewsByCategory.classList.add('card', 'mb-3');
        showAllNewsByCategory.innerHTML = `
        <div class="container d-lg-flex flex-lg-row p-lg-4">
            <img src="${news_item.thumbnail_url}" class="img-fluid rounded-start me-lg-2" alt="...">
            <div class="card-body">
                <h4 class="card-title">${news_item.title}</h4>
                <p class="card-text news-info-container">${news_item.details.slice(0, 350)}...</p>
                
                <div class="news-info-container d-lg-flex align-items-center justify-content-between mt-lg-5 mt-2 border-top p-3">
                    <div class="d-flex justify-content-around align-items-center mb-lg-0 mb-2">
                        <div class="me-2">
                            <img src="${news_item.author.img}" height="40" width="40" class="rounded-circle">
                        </div>
                        <div class="author-details">
                            <p class="m-0">${news_item.author.name}</p>
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
                        <button class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        showNewsContainer.appendChild(showAllNewsByCategory);
    });
};


// Calling the Category Function to load data
loadCategory();