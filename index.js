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
    const baseCurrencyDropdown = document.querySelector(".dropdown");

    const mockExchangeRates = {
        USD: {
            EUR: 0.85,
            RUB: 75.0,
            GBP: 0.72,
            JPY: 110.0
        },
        EUR: {
            USD: 1.18,
            RUB: 88.0,
            GBP: 0.85,
            JPY: 130.0
        },
        RUB: {
            USD: 0.013,
            EUR: 0.011,
            GBP: 0.0095,
            JPY: 1.5
        },
        GBP: {
            USD: 1.38,
            EUR: 1.18,
            RUB: 105.0,
            JPY: 153.0
        },
        JPY: {
            USD: 0.0091,
            EUR: 0.0077,
            RUB: 0.67,
            GBP: 0.0065
        }
    };
// Моковые данные курсов валют тк к апи не подключ
    let baseCurrency = 'RUB'; 

    converterLink.addEventListener("click", () => {
        showSection(converterSection);
        hideSection(ratesSection);
        baseCurrencyDropdown.style.display = 'none'; 
    });

    ratesLink.addEventListener("click", () => {
        showSection(ratesSection);
        hideSection(converterSection);
        fetchRates();
        baseCurrencyDropdown.style.display = 'block'; 
    });

    convertButton.addEventListener("click", () => {
        const input = converterInput.value;
        const [amount, from, , to] = input.split(' ');
        if (amount && from && to) {
            convertCurrency(amount, from.toUpperCase(), to.toUpperCase());
        } else {
            converterResult.textContent = "Invalid input. Please use the format: '15 USD in RUB'.";
        }
    });

    baseCurrencySelect.addEventListener("change", () => {
        baseCurrency = baseCurrencySelect.value;
        fetchRates();
    });

    function showSection(section) {
        section.classList.add('active');
    }

    function hideSection(section) {
        section.classList.remove('active');
    }

    function convertCurrency(amount, from, to) {
        const rate = mockExchangeRates[from][to];
        if (rate) {
            const result = (amount * rate).toFixed(2);
            converterResult.textContent = `${amount} ${from} = ${result} ${to}`;
        } else {
            converterResult.textContent = `Cannot convert from ${from} to ${to}.`;
        }
    }

    function fetchRates() {
        ratesList.innerHTML = '';
        for (const currency in mockExchangeRates[baseCurrency]) {
            const rate = mockExchangeRates[baseCurrency][currency];
            const rateItem = document.createElement('div');
            rateItem.classList.add('rate-item');
            rateItem.textContent = `${currency} ${rate.toFixed(2)}`;
            ratesList.appendChild(rateItem);
        }
    }

    function initializeBaseCurrencySelect() {
        const currencies = Object.keys(mockExchangeRates);
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
    showSection(converterSection);
});
