import View from "./view.js";
class CategoryProductsView extends View {
  _parentElement = document.querySelector(".category-wrapper");
  data;
  _generateMarkup() {
    let data = this.data;
    return data
      .map((el) => {
        return `<div class="category-product">
      <a href="#${el.id}" class="product-link category-product-container-link">
        <img src="${el.images[0]}" alt="category-product" class="category-product-thumbnail">
      <div class="category-product-details">
        <p class="para-large category-product-title">${el.title}</p>
      <p class="para category-product-brand">${el.brand}</p>
      <p class="para category-product-description">${el.description}</p>
      <p class="para-large category-product-price"><b>${el.price}$</b></p>
      </div>
      </a>
  </div>`;
      })
      .join("");
  }
  changeCategoryHeading() {
    document.querySelector(
      ".browse-category-heading"
    ).textContent = `browse category: ${this.data[0].category}`;
  }
  getCategoryProducts(handler) {
    window.addEventListener("hashchange", handler);
  }
}
export default new CategoryProductsView();
