import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
<<<<<<< HEAD
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

// Load the dynamic header and footer for this page
loadHeaderFooter();
=======
import ProductDetails from "./ProductDetails.mjs";
>>>>>>> bce5c6a5489794df969ca1a61d6c91ded7577bb9

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

<<<<<<< HEAD
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
=======
>>>>>>> bce5c6a5489794df969ca1a61d6c91ded7577bb9

