'use strict'

const amountInput = document.querySelector('[data-js-amount]');
const amountResult = document.querySelector('[data-js-result]');
const fromCurrencyEl = document.querySelector('[data-js-from-currency]');
const toCurrencyEl = document.querySelector('[data-js-to-currency]');
const btnConvertEl = document.querySelector('[data-js-btn-conversion]');
const errorMessage = document.querySelector('[data-js-error-message]');
const errorRequest = document.querySelector('[data-js-error-request-message]');

function showValidationError() {
    errorMessage.classList.add('currency-converter__error');
    errorMessage.style.display = 'block';

    amountInput.classList.add('is-invalid');
}

function closeValidatonError() {
    errorMessage.classList.remove('currency-converter__error');
    errorMessage.style.display = 'none';

    amountInput.classList.remove('is-invalid');
}

async function convertCurrency() {
    const amountIn = +amountInput.value;
    const fromCurEl = fromCurrencyEl.value;
    const toCurEl = toCurrencyEl.value;

    const apiKey = '57028cc4d2e785c68d5f5601';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurEl}`;

    if (!amountIn) {
        showValidationError();

        return;
    } else if (amountIn) {
        closeValidatonError();
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate = data.conversion_rates[toCurEl];
        const convertedResult = amountIn * rate;

        amountResult.value = `${convertedResult.toFixed(2)}`;
    } catch (event) {
        errorRequest.classList.remove('hide');
        // console.error(error);
    }
}

btnConvertEl.addEventListener('click', convertCurrency);