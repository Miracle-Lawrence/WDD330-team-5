import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Fetch product data from the API via ProductData.mjs
    this.product = await this.dataSource.findProductById(this.productId);

    if (this.product) {
      // 2. Populate the page with the product info immediately
      this.renderProductDetails();

      // 3. Bind the 'Add to Cart' button to the click event
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    // Retrieve current cart from storage
    let cartItems = getLocalStorage("so-cart");

    // If the storage is empty or not an array, initialize a new list
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    // Add the current product to the list
    cartItems.push(this.product);

    // Save the updated list back to Local Storage
    setLocalStorage("so-cart", cartItems);

    // Provide the required visual feedback
    alert(`${this.product.NameWithoutBrand} has been added to your cart!`);
  }

  renderProductDetails() {
    // Update the DOM elements with the fetched data
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Brand and Product Names
  document.getElementById("productBrandName").textContent = product.Brand.Name;
  document.getElementById("productName").textContent = product.NameWithoutBrand;

  // Image - Using the correct high-res path from the new API
  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  // Price, Color, and Detailed Description
  document.getElementById("productFinalPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColorName").textContent = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;

  // Update button data for tracking
  document.getElementById("addToCart").dataset.id = product.Id;
}
