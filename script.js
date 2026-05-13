'use strict'

const amountInput = document.querySelector('[data-js-amount]');
const amountResult = document.querySelector('[data-js-result]');
const fromCurrency = document.querySelector('[data-js-from-currency]');
const toCurrency = document.querySelector('[data-js-to-currency]');
const btnConvert = document.querySelector('[data-js-btn-conversion]');

const apiKey = '57028cc4d2e785c68d5f5601';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

async function convertCurrency() {
    const amountIn = +amountInput.value;
    const fromCur = fromCurrency.value;
    const toCur = toCurrency.value;

    const response = await fetch(apiUrl);

    const data = await response.json();

    const rate = data.conversion_rates[toCur];

    const convertedResult = amountIn * rate;

    amountResult.value = `${convertedResult.toFixed(2)}`;
}

btnConvert.addEventListener('click', convertCurrency);