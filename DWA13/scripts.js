const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Task 1: Console log each name
names.forEach((name) => console.log(name));

// Task 2: Console log each name with matching province
names.forEach((name, index) => console.log(`${name} (${provinces[index]})`));

// Task 3: Convert province names to uppercase
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// Task 4: Create an array with the length of each name
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Task 5: Sort provinces alphabetically
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Task 6: Remove provinces with the word "Cape" and count remaining provinces
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));
const remainingProvincesCount = filteredProvinces.length;
console.log(remainingProvincesCount);

// Task 7: Create a boolean array indicating if a name contains an 'S'
const containsSArray = names.map((name) => name.includes('S'));
console.log(containsSArray);

// Task 8: Reduce the arrays into an object indicating the province of each individual
const individualsByProvince = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});
console.log(individualsByProvince);
