import View from "./view.js";
class SkincareView extends View {
  _parentElement = document.querySelector(".skincare-products-wrapper");
  data;
  _generateMarkup() {
    let data = this.data;
    return data
      .map((el) => {
        return ` <div class="product-container">
            <a class="product-link" href="#${el.id}">
              <img src="${el.thumbnail}" alt="" class="product-image" />
              <p class="product-title para-small">${el.title}</p></a
            >
          </div>`;
      })
      .join("");
  }
}
export default new SkincareView();
