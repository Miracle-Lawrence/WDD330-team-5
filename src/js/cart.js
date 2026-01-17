import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // get cart items or default to empty array
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    // display a friendly message when cart is empty
    productList.innerHTML = `<li class="cart-empty">Your cart is empty</li>`;
    return; // stop further processing
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();
