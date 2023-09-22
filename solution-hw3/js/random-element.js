/*
Works Cited:
https://stackoverflow.com/questions/8674618/adding-options-to-select-with-javascript
*/

let glazeSelection = document.querySelector("#glazing");
let amountSelection = document.querySelector("#packSize");
let price = document.querySelector("#price");

glazeSelection.addEventListener("change", pickingGlaze);
amountSelection.addEventListener("change", pickingAmount);

//arrays storing display names and values
let glazeOptionsNames = ["Keep Original", "Sugar Milk", "Vanilla Milk", "Double Chocolate"];
let glazeOptionsValues = [0, 0, 0.5, 1.5];
let amountOptionsNames = ["1", "3", "6", "12"];
let amountOptionsValues = [1, 3, 5, 10];

//populating glaze options
for(let i = 0; i < glazeOptionsNames.length; i++){
    let glaze = document.createElement("option");
    glaze.value = glazeOptionsValues[i];
    glaze.innerHTML = glazeOptionsNames[i];
    glazeSelection.add(glaze);
}

//populating amount options
for(let i = 0; i < amountOptionsNames.length; i++){
    let amount = document.createElement("option");
    amount.value = amountOptionsValues[i];
    amount.innerHTML = amountOptionsNames[i];
    amountSelection.add(amount);
}

//defining variables
let basePrice = 2.49;
let glazePrice = 0;
let totalPrice = 0;
let packSize = 1;

//changes the the glaze price value based on user's pick
function pickingGlaze(){
    glazePrice = parseFloat(this.value);
    updatePrice();
} 

//changes the pack size value base on user's pick
function pickingAmount(){
    packSize = parseInt(this.value);
    updatePrice();
}

//updates the total price and displays it on the screen
function updatePrice(){
    totalPrice =  (basePrice + glazePrice) * packSize;
    price.innerHTML = "$" + totalPrice.toFixed(2);
}

