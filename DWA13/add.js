const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  // Exercise 1
  console.log("Exercise 1:");
  products.forEach((product) => {
    console.log(product.product);
  });
  
  // Exercise 2
  console.log("Exercise 2:");
  const filteredProducts = products.filter((product) => !product.product.length <= 5);
  console.log(filteredProducts);
  
  // Exercise 3
  console.log("Exercise 3:");
  const convertedPrices = products
    .filter((product) => product.price !== '' && !isNaN(product.price))
    .map((product) => {
      return {
        ...product,
        price: Number(product.price),
      };
    });
  
  const combinedPrice = convertedPrices.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);
  console.log(combinedPrice);
  
  // Exercise 4
  console.log("Exercise 4:");
  const concatenatedNames = products.reduce((accumulator, product, index) => {
    if (index === 0) {
      return product.product;
    } else if (index === products.length - 1) {
      return `${accumulator} and ${product.product}`;
    } else {
      return `${accumulator}, ${product.product}`;
    }
  }, '');
  console.log(concatenatedNames);
  
  // Exercise 5
  console.log("Exercise 5:");
  const priceComparison = products.reduce(
    (accumulator, product) => {
      if (accumulator.highest.price < product.price) {
        accumulator.highest = product;
      }
      if (accumulator.lowest.price > product.price) {
        accumulator.lowest = product;
      }
      return accumulator;
    },
    {
      highest: { product: '', price: -Infinity },
      lowest: { product: '', price: Infinity },
    }
  );
  console.log(`Highest: ${priceComparison.highest.product}`);
  console.log(`Lowest: ${priceComparison.lowest.product}`);
  
  // Exercise 6
  console.log("Exercise 6:");
  const recreatedObject = Object.entries(products).reduce((accumulator, [key, value]) => {
    const modifiedKey = key === 'product' ? 'name' : key === 'price' ? 'cost' : key;
    return {
      ...accumulator,
      [modifiedKey]: value,
    };
  }, {});
  console.log(recreatedObject);