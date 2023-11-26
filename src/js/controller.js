import * as model from "./model.js";
import View from "./view/view.js";
import searchView from "./view/searchView.js";
import ProductView from "./view/productView.js";
import CategoryView from "./view/categoryView.js";
import CartView from "./view/cartView.js";
import categoryView from "./view/categoryView.js";
import skincareView from "./view/skincareView.js";
import categoryProductsView from "./view/categoryProductsView.js";
import productView from "./view/productView.js";
import cartView from "./view/cartView.js";
let id;
window.addEventListener("hashchange", () => {
  id = window.location.hash.slice(1);
  try {
    if (id === "" || !id) {
      throw new Error("invalid product id");
    }
    if (!isNaN(id) && id && model.state.product.id !== id) {
      controlProduct(id);
      window.location.hash = "";
    }
  } catch (err) {
    productView.renderMessage(
      "something went wrong while fetching prodct data: " + err
    );
  }

  try {
    let isValidCategory = model.state.categories.some((el) => el === id);
    if (isValidCategory) controlCategoryProducts(id);
    else throw new Error("failed while getting category data");
  } catch (err) {
    categoryProductsView.renderMessage(
      "the category data is not available " + err
    );
  }
});
async function controlProduct(id) {
  try {
    productView.renderSpinner();
    await model.loadProduct(id);

    if (model.state.product) {
      model.state.product.addedToCart = model.state.cartProducts.some(
        (el) => el.id === model.state.product.id
      );
      ProductView._render(model.state.product);
      console.log(model.state.product);
    } else {
      throw new Error("something went wrong while fetching the data");
    }
  } catch (err) {
    productView.renderMessage("error loading product: " + err);
  }
}
async function controlCategories() {
  try {
    await model.loadCategories();
    categoryView._render(model.state.categories);
  } catch (err) {
    console.log("something is not right in the categories");
    throw err;
  }
}
async function controlCategoryProducts(categoryName) {
  try {
    categoryProductsView.renderSpinner();

    await model.loadCategoryProducts(categoryName);
    categoryProductsView._render(model.state.categoryProducts);
    categoryProductsView.changeCategoryHeading();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function controlSkincareProducts() {
  try {
    await model.loadSkincareProducts(model.state.skincareProducts);
    skincareView._render(model.state.skincareProducts);
  } catch (err) {
    skincareView.renderMessage("could not display the products, due to " + err);
  }
}
async function controlSearchResults() {
  try {
    searchView.renderSpinner();
    let query = searchView.getSearchQuery();
    if (query.length >= 3) {
      await model.loadSearchResults(query);
      searchView._render(model.state.searchResults);
    } else throw new Error("not a valid search query");
  } catch (err) {
    searchView.renderMessage("error showing results, Reason: " + err);
  }
}

function init() {
  controlCategories();
  controlSkincareProducts();
  searchView.getSearchResults(controlSearchResults);
  productView.handleAddToCard(controlAddToCart);
  productView.handleRemoveFromCart(controlRemoveFromCart);
  cartView.handleRemoveFromCart(controlRemoveFromCart);
  initCart();
}
init();

async function controlAddToCart() {
  try {
    cartView.renderSpinner();
    await model.loadCartProducts();
    model.state.product.addedToCart = model.state.cartProducts.some(
      (el) => el.id === model.state.product.id
    );
    let getCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    cartView._render(getCartProducts);
  } catch (err) {
    cartView.renderMessage("sorry, could not fetch cart data due to " + err);
  }
}
function controlRemoveFromCart(id) {
  model.unloadCartProducts(id);
  model.state.product.addedToCart = model.state.cartProducts.some(
    (el) => el.id === model.state.product.id
  );
  cartView.renderSpinner();

  let getCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  cartView._render(getCartProducts);
  if (model.state.cartProducts.length === 0) {
    cartView.renderMessage(
      "no products in the cart, please add some to cotinue"
    );
  }
}

async function initCart() {
  let savedProducts = JSON.parse(localStorage.getItem("cartProducts"));
  if (savedProducts) model.state.cartProducts = savedProducts;
  if (savedProducts?.length >= 1 && savedProducts) {
    cartView._render(model.state.cartProducts);
  } else cartView.renderMessage("no items on the cart");
}
