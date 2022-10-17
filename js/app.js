//  Loading Catagory Data From the API
const loadCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryData(data.data.news_category))
}

// Display Category Data in the UI
const displayCategoryData = categories => {
    console.log(categories)
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
    console.log(news);
    news.forEach( news_item => {
        const showNewsContainer =document.getElementById('show-news-container');
        const showAllNewsByCategory = document.createElement('div');
        showAllNewsByCategory.classList.add('card', 'mb-3');
        showAllNewsByCategory.innerHTML = `
        <div class="container d-flex flex-row p-lg-4">
            <img src="${news_item.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            <div class="card-body">
                <h4 class="card-title">${news_item.title}</h4>
                <p class="card-text">${news_item.details.slice(0, 350)}...</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        `;

        showNewsContainer.appendChild(showAllNewsByCategory);
    })
};


// Calling the Category Function to load data
loadCategory();