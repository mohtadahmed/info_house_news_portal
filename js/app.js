//  Loading Catagory Data From the API
const loadCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryData(data.data.news_category))
}

// Display Category Data in the UI
const displayCategoryData = categories => {
    categories.forEach(category =>{
        const newsCategory = document.getElementById('news-category');
        const categorListItem = document.createElement('li');
        categorListItem.innerHTML = `
            <li class="category-list-items">${category.category_name}</li>
        `;

        newsCategory.appendChild(categorListItem);
    });
};


// Calling the Category Function to load data
loadCategory();