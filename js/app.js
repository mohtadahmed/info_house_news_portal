//  Loading Catagory Data From the API
const loadCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryData(data.data.news_category))
}

const displayCategoryData = categories => {
    // console.log(catagories.news_category)
    // console.log(categories);
    
    categories.forEach(element =>{
        console.log(element.category_name);
    });
}


loadCategory();