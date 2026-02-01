import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Step 4: Listening for the submit button click
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  // 1. Get the form from the DOM
  const myForm = document.forms["checkout-form"];

  // 2. Check validity
  const chk_status = myForm.checkValidity();

  // 3. Report validity (shows the bubbles to the user)
  myForm.reportValidity();

  // 4. Only call checkout if valid
  if (chk_status) {
    myCheckout.checkout();
  }
});
