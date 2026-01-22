import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Load the dynamic header and footer for this page
loadHeaderFooter();

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add event listeners to all add-to-cart buttons
const buttons = document.querySelectorAll(".addToCart");

buttons.forEach((button) => {
  button.addEventListener("click", addToCartHandler);
});

// Display discount on product detail pages
async function displayDiscounts() {
  const discountElements = document.querySelectorAll(".product-discount");

  for (const el of discountElements) {
    const productId = el.dataset.id;
    const product = await dataSource.findProductById(productId);

    if (product?.Discount) {
      el.textContent = `Discount: ${product.Discount}% off`;
    }
  }
}

displayDiscounts();