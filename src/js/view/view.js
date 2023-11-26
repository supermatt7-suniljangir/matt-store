export default class View {
  data;
  _clear() {
    this._parentElement.innerHTML = "";
  }
  _render(data) {
    this.data = data;
    this._clear();
    let html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderMessage(message = this._errorMessage) {
    let markup = ` <div class="message">
            <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  handleRemoveFromCart(handler) {
    this._parentElement.addEventListener("click", function (e) {
      let removeFromCart = e.target.closest(".delete-from-cart-btn");
      if (removeFromCart) {
        console.log(e.target);
        let id = +removeFromCart.dataset.id;
        handler(id);
        document
          .querySelector(".remove-from-cart-btn")
          ?.classList.add("hidden");
        document.querySelector(".add-to-cart-btn").removeAttribute("disabled");
        document.querySelector(".add-to-cart-btn").textContent = "add to cart";
      }
    });
  }
  renderSpinner() {
    const markUp = `<div class="spinner">
        </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
