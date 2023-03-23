import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
// Business Logic
function getExchange(amount, currency) {
  let request = new XMLHttpRequest();
  const url = `https://v6.exchangerate-api.com/v6/987dcfb5b314687fca8df694/latest/USD`;
  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, amount, currency);
    }
  });

  request.open("GET", url, true);
  request.send();
}
// UI Logic
function printElements(apiResponse, amount, currency) {
  document.querySelector(
    "#showResponse"
  ).innerText = `${amount} USD is equal to ${
    apiResponse.conversion_rates[currency] * amount
  } ${currency}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const amount = document.querySelector("#amount").value;
  document.querySelector("#amount").value = null;
  getExchange(amount, currency);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
