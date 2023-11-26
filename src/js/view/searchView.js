import View from "./view.js";

class searchView extends View {
  _parentElement = document.querySelector(".search-results-wrapper");
  data;
  _generateMarkup() {
    let data = this.data;
    console.log(data);
    return data
      .map((el) => {
        return ` <a href="#${el.id}" class="product-link">
     <div class="found-product">
     <img src="${el.thumbnail}" alt="${el.title}" class="product-container-l">
    <div class="product-container-r">
<p class="product-title para-medium">${el.title}</p>
<p class="product-brand">${el.brand}</p>
    </div>
  </div>
   </a>`;
      })
      .join("");
  }
  getSearchQuery() {
    let query = document.querySelector(".serach-bar-input").value;
    document.querySelector(".serach-bar-input").value = "";
    return query;
  }
  getSearchResults(handle) {
    document.querySelector(".search-form").addEventListener("submit", (e) => {
      e.preventDefault();
      handle();
    });
  }
}
export default new searchView();
