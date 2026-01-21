import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs"; // Import the helper function

// Load the dynamic header and footer
loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

// Initialize the ProductList class to render the tents
const myList = new ProductList("tents", dataSource, listElement);
myList.init();
