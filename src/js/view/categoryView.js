import View from "./view.js";

class CategoryView extends View {
  data;
  _parentElement = document.querySelector(".dropdown-contents");
  _generateMarkup(receiveData) {
    let data = this.data;
    // prettier-ignore
    return data.map((el) => {
        return `<p class="category-box" category="${el}"><a href="#${el}" class="category-link">${el}</a></p>`;
      })
      .join("");
  }
}

export default new CategoryView();
