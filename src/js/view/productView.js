import View from "./view.js";

class ProductView extends View {
  data;
  addedToCart = this.data?.addedToCart;
  _parentElement = document.querySelector(".product-wrapper");
  _generateMarkup() {
    let data = this.data;

    return (
      data &&
      `<div class="mega-product-container">
<div class="product-pics-balls-container">
  ${
    // prettier-ignore
    data?.images.map((el) => {
      return `<div class="product-pic-ball"><img src="${el}" alt="product-pic" class="product-image-preview"></div>`;
    })
    .join("")
  }
</div>
<div class="product-image-container"><img src="${
        data.thumbnail
      }" alt="" class="product-image"></div>

<div class="product-extended-information">
      <p class="para-large">${data.title}</p>
      <p class="product-brand para-medium">${data.brand}</p>
      <p class="para product-description">${data.description}</p>
      <p class="para-large product-price"><b>${
        data.price
      }$</b><sub><span class="price-without-discount">${+(
        data.price +
        (data.price * data.discountPercentage) / 100
      ).toFixed(0)}$</span></sub></p>
      <p class="discount-percentages para">${data.discountPercentage}% off</p>
      <button class="add-to-cart-btn" ${data.addedToCart ? "disabled" : ""}>${
        data.addedToCart ? "added to cart" : "add to cart"
      }</button>
       <button class="remove-from-cart-btn delete-from-cart-btn ${
         data.addedToCart ? "" : "hidden"
       }" data-id="${data.id}">remove from cart</button>
    </div>
    </div>`
    );
  }
  handleAddToCard(handler) {
    document
      .querySelector(".product-wrapper")
      .addEventListener("click", function (e) {
        let cartBtn = e.target.closest(".add-to-cart-btn");
        let removeFromCartBtn = document.querySelector(".remove-from-cart-btn");
        if (cartBtn) {
          handler();
          cartBtn.setAttribute("disabled", "true");
          removeFromCartBtn.classList.remove("hidden");
          cartBtn.textContent = "added to cart";
        }
      });
  }
  getProductView(handler) {
    window.addEventListener("hashchange", handler);
  }
}
export default new ProductView();
