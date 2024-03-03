const accesskey = "P48P7g0we8NnNMlFznI2jkcgxDA-YCcMnIztFCVYpx0";
const searchform = document.querySelector('form');
const imageContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadmorebtn = document.querySelector('.loadMore');  
let page = 1;

const fetchImage = async (query,pageno)=>{
    if(pageno == 1){
        imageContainer.innerHTML = '';
    }
    
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${pageno}&per_page=28&client_id=${accesskey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    data.results.forEach(photo => {
        const imagelement = document.createElement('div');
        imagelement.classList.add('imageDiv');
        imagelement.innerHTML = `<img src="${photo.urls.regular}"/>`;

         const overlayElement = document.createElement('div');
         overlayElement.classList.add('overlay');

         imagelement.appendChild(overlayElement);
        imageContainer.appendChild(imagelement);

        //creating overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
    });
    if(data.total_pages === pageno){
        loadmorebtn.style.display = "none";
    }else{
        loadmorebtn.style.display = "block";
    }
    
}

searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        
        fetchImage(inputText,page);
    }else{
        imageContainer.innerHTML = `<h2>Please enter a search query</h2>`
    }
})

//load more button function
loadmorebtn.addEventListener('click',()=>{
    fetchImage(searchInput.value.trim(),++page)
})
