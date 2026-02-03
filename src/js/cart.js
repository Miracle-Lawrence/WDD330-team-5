import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  // default quantity if it doesn't exist
  const quantity = item.quantity || 1;
  const itemTotal = (item.FinalPrice * quantity).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <div class="cart-card__quantity">
      <button class="qty-btn" data-index="${index}" data-action="decrease">−</button>
      <span>${quantity}</span>
      <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
    </div>

    <p class="cart-card__price">$${itemTotal}</p>
  </li>`;
}

// Handle quantity button clicks
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("qty-btn")) return;

  const index = Number(e.target.dataset.index);
  const action = e.target.dataset.action;

  const cartItems = getLocalStorage("so-cart");

  if (!cartItems[index].quantity) {
    cartItems[index].quantity = 1;
  }

  if (action === "increase") {
    cartItems[index].quantity += 1;
  }

  if (action === "decrease" && cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
});

renderCartContents();
