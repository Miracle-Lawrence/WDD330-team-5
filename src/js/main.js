import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
<<<<<<< HEAD
import { loadHeaderFooter } from "./utils.mjs"; // Import the helper function

// Load the dynamic header and footer
loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

// Initialize the ProductList class to render the tents
const myList = new ProductList("tents", dataSource, listElement);
myList.init();
=======

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
>>>>>>> bce5c6a5489794df969ca1a61d6c91ded7577bb9
