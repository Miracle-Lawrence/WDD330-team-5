import { getLocalStorage } from "./utils.mjs";

/* ================================
   ADDED: helper to save to localStorage
================================ */
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  /* ================================
     ADDED: attach quantity listeners
  ================================ */
  addQuantityListeners();
}

function cartItemTemplate(item, index) {
  /* ================================
     ADDED: default quantity if missing
  ================================ */
  const quantity = item.quantity ?? 1;

  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <!-- ================================
         ADDED: quantity input field
    ================================ -->
    <label>
      Qty:
      <input 
        type="number" 
        min="1" 
        value="${quantity}" 
        data-index="${index}"
        class="cart-qty-input"
      />
    </label>

    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

/* ================================
   ADDED: listen for quantity changes
================================ */
function addQuantityListeners() {
  const inputs = document.querySelectorAll(".cart-qty-input");

  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);

      if (newQty < 1 || isNaN(newQty)) return;

      const cartItems = getLocalStorage("so-cart");

      /* ================================
         ADDED: update quantity in storage
      ================================ */
      cartItems[index].quantity = newQty;

      setLocalStorage("so-cart", cartItems);
    });
  });
}

renderCartContents();
