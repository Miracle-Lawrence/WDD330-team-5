import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

// Helper function to convert form data to JSON
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// Helper function to format items for the API
function packageItems(items) {
  const simplifiedItems = items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  // Method to initialize the process
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector);
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");

    itemNumElement.innerText = this.list.length;

    // Calculate total of items
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

    summaryElement.querySelector("#subtotal").innerText = "$" + this.itemTotal.toFixed(2);
  }

  calculateOrderTotal() {
    // Shipping: $10 for first item, $2 for each additional
    this.shipping = 10 + (this.list.length - 1) * 2;
    // Tax: 6%
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    // Total
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const summaryElement = document.querySelector(this.outputSelector);
    summaryElement.querySelector("#shipping").innerText = "$" + this.shipping;
    summaryElement.querySelector("#tax").innerText = "$" + this.tax;
    summaryElement.querySelector("#orderTotal").innerText = "$" + this.orderTotal;
  }

  async checkout() {
    const formElement = document.forms["checkout-form"];
    const json = formDataToJSON(formElement);

    // Add extra needed data
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    try {
      const res = await services.checkout(json);
      // eslint-disable-next-line no-console
      console.log(res);

      // Success logic: clear cart and redirect
      setLocalStorage(this.key, []);
      location.assign("/checkout/checkedout.html");

    } catch (err) {
      // Step 5: Handling the error from the server

      // 1. Clear existing alerts
      const existingAlerts = document.querySelectorAll(".alert");
      existingAlerts.forEach((alert) => alert.remove());

      // 2. Resolve the error messages
      const errorResponse = await err.message;

      // 3. Display each alert using the utility function
      for (let key in errorResponse) {
        alertMessage(errorResponse[key]);
      }

      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}
