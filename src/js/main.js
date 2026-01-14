import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

// Initialize the class
const myList = new ProductList("tents", dataSource, listElement);
myList.init();
