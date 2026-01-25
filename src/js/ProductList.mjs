import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/src/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const data = await this.dataSource.getData(this.category);
    const titleElement = document.querySelector(".products h2");
    if (titleElement) {
      titleElement.innerHTML = `Top Products: ${this.category}`;
    }
    this.renderList(data);
  }

  updateTitle() {
    const titleElement = document.querySelector("#category-title");
    if (titleElement && this.category) {
      // Capitalizar la primera letra y reemplazar guiones con espacios
      const formattedCategory = this.category
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      titleElement.textContent = `Top Products: ${formattedCategory}`;
    }
  }
  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
