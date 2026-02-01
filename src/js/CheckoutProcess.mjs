import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

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
    // Logic to read from localStorage goes here
  }

  // Step 3: Implement the checkout method with error handling
  async checkout() {
    const formElement = document.forms["checkout-form"];

    // Basic logic to gather data (to be expanded)
    const json = {};

    try {
      // Step 3.1: The part that can break goes here
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      // Step 3.1: Handling the error from Step 2
      console.log(err);
    }
  }
}
