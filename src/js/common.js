let userIcon = document.querySelector(".item-user");
let cancelIconUser = document.querySelector(".user-page-cancel-icon");
let cancelCartIcon = document.querySelector(".cart-cancel-icon");
let formWindow = document.querySelector("#user-form");
let cancelProductIcon = document.querySelector(".product-cancel-icon");
let categoriesContainer = document.querySelectorAll(
  ".categories-wrapper-container"
);

let dropdownContents = document.querySelector(".dropdown-contents");
// prettier-ignore
let cancelCategoryIcon = document.querySelector(".category-product-cancel-icon");
let categoryWindow = document.querySelector("#category-page");
let searchIcon = document.querySelector(".svg-search-icon-container");
let goToTop = document.querySelector(".go-to-top");
let cartWindow = document.querySelector("#cart");
let cartIcon = document.querySelector(".item-cart");
let productWindow = document.querySelector("#product");
let searchWindow = document.querySelector("#search-results");
goToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// handling click on preview image to load new product image
function handleProductImageChange(e) {
  let image = e.target.closest(".product-image-preview");
  if (!image) return;
  console.log(image.src);

  document
    .querySelector(".product-image-container")
    .querySelector(".product-image").src = image.src;
}
// prettier-ignore
// calling for click
document.querySelector(".product-wrapper").addEventListener("click", handleProductImageChange);
// calling to mouseover
document
  .querySelector(".product-wrapper")
  .addEventListener("mouseover", handleProductImageChange);

// handle user window
function handleUserForm() {
  userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    formWindow.style.transform = `translateX(0)`;
  });
  cancelIconUser.addEventListener("click", (e) => {
    formWindow.style.transform = `translateX(-200%)`;
  });
}
handleUserForm();

function handleCart() {
  let opened = false;
  cartIcon.addEventListener("click", () => {
    window.location.hash = "/cart";
    cartWindow.style.zIndex = 2;
    opened = !opened;
    opened
      ? (cartWindow.style.transform = `translateX(0)`)
      : (cartWindow.style.transform = `translateX(-200%)`);
  });
  cancelCartIcon.addEventListener("click", () => {
    cartWindow.style.transform = `translateX(-200%)`;
    opened = false;
  });
  cartWindow.addEventListener("click", (e) => {
    let categoryProductIcon = e.target.closest(".cart-product");
    let notToTouch = e.target.closest(".delete-from-cart-btn");
    if (categoryProductIcon && !notToTouch) {
      cartWindow.style.zIndex = 0;
      opened = false;
    } else cartWindow.style.zIndex = 2;
  });
}
handleCart();

function handleProduct() {
  cancelProductIcon.addEventListener("click", () => {
    productWindow.style.transform = `translateX(-200%)`;
  });
  document.body.addEventListener("click", (e) => {
    let productIcon = e.target.closest(".product-link");
    if (productIcon) {
      productWindow.style.opacity = `1`;

      productWindow.style.transform = `translateX(0)`;
      categoryWindow.style.opacity = `0`;

      categoryWindow.style.transform = `translateX(-200%)`;
    }
  });
}
handleProduct();

function handleSearchResults() {
  searchIcon.addEventListener("click", (e) => {
    searchWindow.style.display = "block";
  });

  searchWindow.addEventListener("click", (e) => {
    let foundProduct = e.target.closest(".found-product");
    let closeSearchResultsIcon = e.target.closest(
      ".search-results-cancel-icon"
    );
    let searchOverlay = e.target.closest(".search-overlay");
    if (foundProduct || closeSearchResultsIcon || searchOverlay) {
      searchWindow.style.display = "none";
    }
  });
}
handleSearchResults();

function handleCategoryResults() {
  cancelCategoryIcon.addEventListener("click", () => {
    categoryWindow.style.transform = `translateX(-200%)`;
  });
  categoriesContainer.forEach((el) => {
    el.addEventListener("click", (e) => {
      let categoryBox = e.target.closest(".category-link");
      if (categoryBox) {
        categoryWindow.style.transform = `translateX(0)`;
        categoryWindow.style.opacity = `1`;
        productWindow.style.opacity = `0`;
        productWindow.style.transform = `translateX(-200%)`;
      }
    });
  });
}
handleCategoryResults();

// swipers
new Swiper(".swiper1", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 10,
    shadowScale: 0.94,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper(".swiper2", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "3",
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 1,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
});

// feedback form
let sendForm = function () {
  let form = document.querySelector(".form");
  // Add an event listener for form submission
  form.addEventListener("submit", (event) => {
    // Prevent the default form submission
    event.preventDefault();
    // Get the form data
    const formData = new FormData(form);
    // Create a new XHR object
    const xhr = new XMLHttpRequest();
    // Set up the XHR request
    xhr.open("POST", form.action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Set up the event listener for when the XHR request finishes
    xhr.onload = function () {
      if (xhr.status === 200) {
        form.reset();
        alert("feedback provided successfully");
      } else {
        form.reset();
        alert(
          "There was a technical error while sending your feedback, please contact the owner for resolution."
        );
      }
    };
    // Send the XHR request with the form data
    xhr.send(new URLSearchParams(formData));
  });
};
sendForm();
