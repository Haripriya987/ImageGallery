

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://pixabay.com/api/?key=37718912-ec8087a79aa57a931ed7c2db8&q=${keyword}&image_type=photo&page=${page}&pretty=true`;
  const response = await fetch(url);
  const data = await response.json();
  const elements = data.hits;
  elements.forEach((element) => {
    const tags = element.tags.toLowerCase().split(",");
    if (tags.some((tag) =>tag.includes(keyword.toLowerCase()))) {
      const image = document.createElement("img");
      image.src = element.largeImageURL;
      const imageLink = document.createElement("a");
      imageLink.href = element.webformatURL;
      imageLink.target = "_blank";
      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    }
    
  });
  showMore.style.display="block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; // Clear previous search results
  searchImages();
});
showMore.addEventListener("click",()=>{
    page++;
    searchImages();
});
