
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let productPic = document.querySelector("#detailPhotos");
let productName = document.querySelector("#productName");

productPic.src = ".././assets/products/" + rolls[rollType].imageFile;
productName.innerText = rollType + " Cinnamon Roll";

let details = rolls[rollType];

let rollBasePrice = document.querySelector("#price");
rollBasePrice.innerHTML = "$" + rolls[rollType].basePrice.toFixed(2);


let glazeSelection = document.querySelector("#glazing");
let amountSelection = document.querySelector("#packSize");
//let price = 

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
let basePrice = rolls[rollType].basePrice;
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

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}



let cart = [];

function checkCart() {
    const cartString = localStorage.getItem("storedRolls");
    if (cartString) {
      cart = JSON.parse(cartString);
    }
  }
  
  checkCart();

let addToCart = document.querySelector("#addBtn");

addToCart.addEventListener("click", () => {
    let glaze = glazeOptionsNames[glazeOptionsValues.indexOf(parseFloat(glazeSelection.value))];
    let amount = amountOptionsNames[amountOptionsValues.indexOf(parseFloat(amountSelection.value))];

    let newRoll = new Roll(rollType, glaze, amount, basePrice);

    cart.push(newRoll);

    saveToLocalStorage();

});



function saveToLocalStorage() {
    const cartString = JSON.stringify(cart);
  
    localStorage.setItem("storedRolls", cartString);
}


