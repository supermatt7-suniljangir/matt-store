import View from "./view.js";

class CartView extends View {
  _parentElement = document.querySelector(".cart-wrapper");
  data;

  _generateMarkup() {
    let data = this.data;
    return data
      .map((el) => {
        return ` <div class="cart-product">
      <a href="#${el.id}" class="product-link cart-product-container-link">
      <div class="cart-product-l">
        <img src="${el.thumbnail}" alt="${
          el.title
        }" class="cart-product-thumbnail">
      </div>
      <div class="cart-product-r">
        <p class="para-large cart-product-title">${el.title}</p>
      <p class="para cart-product-brand">${el.brand}</p>
      <p class="para cart-product-description">${el.description}</p>
      <p class="para-large cart-product-price"><b>${
        el.price * el.quantity
      } </b></p>
      <p class="para cart-product-quantity">Quantity: &nbsp;<span class="cart-product-quantity-minus">- </span>${
        el.quantity
      }<span class="cart-product-quantity-plus">+</span></p>
      </div>
      </a>
      <a href="#${
        el.id
      }" class="delete-link"><div class="delete-from-cart delete-from-cart-btn" data-id="${
          el.id
        }"><svg width="25" height="30" viewBox="0 0 37 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M35.4375 2.62501H25.5937L24.8226 1.09103C24.6593 0.76308 24.4077 0.487216 24.0961 0.294472C23.7845 0.101728 23.4254 -0.000248388 23.059 1.43823e-05H13.6828C13.3173 -0.00139086 12.9587 0.100206 12.6482 0.293164C12.3378 0.486123 12.0879 0.762638 11.9273 1.09103L11.1562 2.62501H1.3125C0.964403 2.62501 0.630564 2.76329 0.384422 3.00944C0.138281 3.25558 0 3.58942 0 3.93751L0 6.56251C0 6.91061 0.138281 7.24445 0.384422 7.49059C0.630564 7.73673 0.964403 7.87501 1.3125 7.87501H35.4375C35.7856 7.87501 36.1194 7.73673 36.3656 7.49059C36.6117 7.24445 36.75 6.91061 36.75 6.56251V3.93751C36.75 3.58942 36.6117 3.25558 36.3656 3.00944C36.1194 2.76329 35.7856 2.62501 35.4375 2.62501ZM4.36406 38.3086C4.42666 39.3082 4.86786 40.2465 5.59786 40.9323C6.32785 41.618 7.29175 41.9999 8.29336 42H28.4566C29.4582 41.9999 30.4221 41.618 31.1521 40.9323C31.8821 40.2465 32.3233 39.3082 32.3859 38.3086L34.125 10.5H2.625L4.36406 38.3086Z" fill="#FEFEFE"/>
</svg>
</div></a>
  </div>`;
      })
      .join("");
  }
}
export default new CartView();
