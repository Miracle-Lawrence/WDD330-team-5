import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// 1. Initialize the dynamic header and footer
loadHeaderFooter();

// 2. Set up the data source for the product list
const dataSource = new ProductData("tents");

// 3. Select the element and initialize the list rendering
const listElement = document.querySelector(".product-list");
const myList = new ProductList("tents", dataSource, listElement);

// 4. Render the list
myList.init();
