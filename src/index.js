import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
// Business Logic
function getExchange(amount, toCurrency) {
  let request = new XMLHttpRequest();
  const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, amount, toCurrency);
    }
  });

  request.open("GET", url, true);
  request.send();
}
// UI Logic
function printElements(apiResponse, amount, toCurrency) {
  document.querySelector(
    "#showResponse"
  ).innerText = `${amount} USD is equal to ${
    apiResponse.conversion_rates[toCurrency] * amount
  } ${toCurrency}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector("#amount").value;
  const toCurrency = document.querySelector("#toCurrency").value;
  document.querySelector("#amount").value = null;
  document.querySelector("#toCurrency").value = null;
  getExchange(amount, toCurrency);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
