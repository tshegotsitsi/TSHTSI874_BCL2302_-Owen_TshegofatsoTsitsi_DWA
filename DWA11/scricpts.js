
const store = createStore(tallyReducer);

const MAX_NUMBER = 10;
const MIN_NUMBER = -10;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');

const resetHandler = () => {
  store.dispatch({ type: 'RESET' });
  alert('The counter has been reset');
};

const subtractHandler = () => {
  const newValue = parseInt(number.value) - 1;
  number.value = newValue;

  if (add.disabled === true) {
    add.disabled = false;
  }

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }

  store.dispatch({ type: 'SUBTRACT' });
};

const addHandler = () => {
  const newValue = parseInt(number.value) + 1;
  number.value = newValue;

  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }

  store.dispatch({ type: 'ADD' });
};

subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);

// Log the state to the console whenever it changes
store.subscribe(() => {
  const newState = store.getState();
  console.log(newState);
});