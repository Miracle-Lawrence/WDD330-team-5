import { renderListWithTemplate } from "./utils.mjs";

/**
 * Template function: Defines the structure for each product card.
 * Uses the product ID to create a dynamic link to the details page.
 */
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}">
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <h3 class="card__brand">${product.Brand.Name}</h3>
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

  /**
   * Initializes the product list:
   * 1. Fetches data from the source.
   * 2. Filters the list to show only the first 4 items.
   * 3. Renders the items using the template.
   */
  async init() {
    // Fetch the list from our data source
    const list = await this.dataSource.getData();

    // Filter the list to show only the first 4 products (Requirement)
    const filteredList = list.slice(0, 4);

    // Render the filtered list
    this.renderList(filteredList);
  }

  renderList(list) {
    // Uses the reusable utility function to inject HTML into the DOM
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
