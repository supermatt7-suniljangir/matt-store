import { AJAX } from "./helper.js";

export const state = {
  product: {},
  categories: [],
  categoryProducts: [],
  searchResults: [],
  skincareProducts: [],
  carouselProducts: [],
  cartProducts: [],
};

export async function loadProduct(id) {
  try {
    let newData = await AJAX(id);
    state.product = newData
  } catch (err) {
    throw err;
  }
}

export async function loadCategories() {
  try {
    let data = await AJAX(`categories`);
    state.categories = data;
    // console.log(state.categories);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function loadCategoryProducts(categoryName) {
  try {
    let data = await AJAX(`category/${categoryName}`);
    state.categoryProducts = data.products;
    // console.log(state.categoryProducts);
  } catch (err) {
    console.log("something is wrong with categoryProductsView");
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    let data = await AJAX(`search?q=${query}`);
    if (data.products.length > 1) state.searchResults = data.products;
    else throw new Error("no product found for your query");
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function loadSkincareProducts() {
  try {
    let data = await AJAX(`category/skincare?limit=4`);
    state.skincareProducts = data.products;
    if (data.products.length > 4) {
      throw new Error(
        "please check the internet connection or refresh and try again"
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function loadCartProducts() {
  try {
    if (state.product) {
      state.cartProducts.push(state.product);
      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
    }
  } catch (err) {
    throw err;
    console.log(err);
  }
}
export function unloadCartProducts(id) {
  console.log(state.cartProducts);
  if (state.cartProducts.some((el) => el.id === id)) {
    let indexToRemove = state.cartProducts.findIndex(
      (product) => product.id === id
    );
    state.cartProducts.splice(indexToRemove, 1);

    localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
  }
}
