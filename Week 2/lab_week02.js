/* Exercise 1: syntax changeover */
function greeter(myArray, counter) {
    let greetText = 'Hello ';
    for (let i = 0; i < counter; i++) {
        console.log(greetText + myArray[i]);
    }
}
console.log("* Exercise 1")
greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);

/* Exercise 2: destructure and spread for capitlizing first letters */
function capitalize(string) {
    const [firstLetter, ...restOfString] = string;
    return [firstLetter.toUpperCase(), ...restOfString].join('');
}
console.log("* Exercise 2")
console.log(capitalize('fooBar'));
console.log(capitalize('nodeJs'));

/* Exercise 3: capitalize the first letter of each word in the array using proto.map */
function capitalizeWithMap(arr) {
    console.log("* Exercise 3")
    console.log(arr.map(word => capitalize(word)).join(' '));}
colourArray = ['Red', 'Green', 'Blue']
capitalizeWithMap(colourArray)

/* Exercise 4: filter out values less than 20 using proto.filter */
function filterLessThan20(arr){
    console.log("* Exercise 4")
    console.log(arr.filter(num => num <= 20));
}
numArr = [1,60,34,30,20,5]
filterLessThan20(numArr)

/* Exercise 5: sum an array using proto.reduce */
function calculateSum(arr){
    // sum
    console.log("* Exercise 5")
    console.log("Sum: " + arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // product
    console.log("Product: " + arr.reduce((accumulator, currentValue) => accumulator * currentValue, 1));
}
numArr2 = [1,2,3,4]
calculateSum(numArr2)

/* Exercise 6: create a Car class, and extend it to the subclass Sedan, sedan has an additional value for balance */
class Car {
    constructor(model, year) {
        this.model = model;
        this.year = year;
    }
    details() {
        return `Model: ${this.model}, Year: ${this.year}`;
    }
}
class Sedan extends Car {
    constructor(model, year, balance) {
        super(model, year);
        this.balance = balance;
    }
    info() {
        return `${super.details()}, Balance: ${this.balance}`;
    }
}
console.log("* Exercise 6")
const car = new Car('Toyota Corolla', 2020);
console.log(car.details());
const car2 = new Sedan('Honda Accord', 2021, 15000);
console.log(car2.info());