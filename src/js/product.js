import {
  getParam,
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Initialize dynamic Header and Footer components
loadHeaderFooter();

// Set up the data source and retrieve the product ID from the URL
const dataSource = new ProductData("tents");
const productID = getParam("product");

// Initialize product details logic and rendering
const productDetail = new ProductDetails(productID, dataSource);
productDetail.init();

/**
 * Adds a product object to the local storage cart.
 * @param {Object} item - The product object to add.
 */
function addProductToCart(item) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(item);
  setLocalStorage("so-cart", cartItems);
}

// Event handler for the "Add to Cart" button click
async function addToCartHandler(e) {
  const productItem = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productItem);
}

// Attach event listener to the Add to Cart button if it exists
document.getElementById("addToCart")?.addEventListener("click", addToCartHandler);
