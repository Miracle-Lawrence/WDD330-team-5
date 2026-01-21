import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (this.product) {
      this.renderProductDetails();
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.getElementById("productBrandName").textContent = product.Brand.Name;
  document.getElementById("productName").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = `/src/${product.Image}`;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productFinalPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColorName").textContent = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
