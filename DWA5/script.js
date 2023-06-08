
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dividendInput = event.target.elements.dividend;
    const dividerInput = event.target.elements.divider;
    const dividend = dividendInput.value.trim();
    const divider = dividerInput.value.trim();

    if (dividend === "" || divider === "") {
        displayErrorMessage("Both values are required in inputs. Try again");
    } else if (!isNumeric(dividend) || !isNumeric(divider)) {
        displayCriticalErrorMessage();
        console.error("Something critical went wrong. Please reload the page", {
            dividend,
            divider,
        });
    } else if (divider < 0){
        displayErrorMessage("Division not performed. Invalid number provided. Try again");
        console.error("Division by a number less 0");
    } else {
        const divisionResult = Number(dividend) / Number(divider);
        displayResult(Number.isInteger(divisionResult) ? divisionResult : Math.floor(divisionResult));
    }

    // Helper functions for displaying result and error messages
    function displayResult(value) {
        result.innerText = value;
    }

    function displayErrorMessage(message) {
        result.innerText = `Division not performed. ${message}`;
    }

    function displayCriticalErrorMessage() {
        document.body.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 200px; background-color: #ffcccc; color: #333; font-size: 18px; font-weight: bold;">Something critical went wrong. Please reload the page</div>`;
      }
      

    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
});