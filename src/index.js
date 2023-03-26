import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyService from "./currency-service.js";

// Business Logic

function getExchange(amount, toCurrency) {
  let promise = CurrencyService.getExchange();
  promise.then(
    function (response) {
      printElements(response, amount, toCurrency);
    },
    function (request) {
      printError(request, amount, toCurrency);
    }
  );
}

// UI Logic
function printElements(response, amount, toCurrency) {
  const amountValue = amount;
  const toCurrencyValue = toCurrency;
  const conversionRate = response.conversion_rates[toCurrencyValue];
  const convertedAmount = amountValue * conversionRate;

  document.querySelector(
    "#showResponse"
  ).innerText = `${amountValue} USD is equal to ${convertedAmount} ${toCurrencyValue}`;
}

function printError(request, amount, toCurrency) {
  const amountValue = amount;
  const toCurrencyValue = toCurrency;
  const errorMessage = request.statusText;

  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error converting ${amountValue} USD to ${toCurrencyValue}. Error message: ${errorMessage}`;
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
