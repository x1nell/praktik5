document.addEventListener("DOMContentLoaded", () => {
    const converterLink = document.getElementById("converter-link");
    const ratesLink = document.getElementById("rates-link");
    const converterSection = document.getElementById("converter");
    const ratesSection = document.getElementById("rates");
    const converterInput = document.getElementById("converter-input");
    const convertButton = document.getElementById("convert-button");
    const converterResult = document.getElementById("converter-result");
    const baseCurrencySelect = document.getElementById("base-currency");
    const ratesList = document.getElementById("rates-list");

    const API_KEY = '4c6ff719b23a378ae58213bd'; 
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

    let baseCurrency = 'USD';

    converterLink.addEventListener("click", () => {
        converterSection.style.display = "block";
        ratesSection.style.display = "none";
    });

    ratesLink.addEventListener("click", () => {
        converterSection.style.display = "none";
        ratesSection.style.display = "block";
        fetchRates();
    });

    convertButton.addEventListener("click", () => {
        const input = converterInput.value;
        const [amount, from, , to] = input.split(' ');
        convertCurrency(amount, from.toUpperCase(), to.toUpperCase());
    });

    baseCurrencySelect.addEventListener("change", () => {
        baseCurrency = baseCurrencySelect.value;
        fetchRates();
    });

    function convertCurrency(amount, from, to) {
        fetch(`${API_URL}${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rates[to];
                const result = (amount * rate).toFixed(2);
                converterResult.textContent = `${amount} ${from} = ${result} ${to}`;
            })
            .catch(error => {
                console.error("Error:", error);
                converterResult.textContent = "An error occurred.";
            });
    }

    function fetchRates() {
        fetch(`${API_URL}${baseCurrency}`)
            .then(response => response.json())
            .then(data => {
                ratesList.innerHTML = '';
                for (const [currency, rate] of Object.entries(data.conversion_rates)) {
                    const rateItem = document.createElement('p');
                    rateItem.textContent = `1 ${baseCurrency} = ${rate} ${currency}`;
                    ratesList.appendChild(rateItem);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                ratesList.textContent = "An error occurred.";
            });
    }

    function initializeBaseCurrencySelect() {
        const currencies = ["USD", "EUR", "RUB", "GBP", "JPY"];
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            if (currency === baseCurrency) option.selected = true;
            baseCurrencySelect.appendChild(option);
        });
    }

    initializeBaseCurrencySelect();
    fetchRates();
    converterSection.style.display = "block";
});
