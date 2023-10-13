
//let cartItems = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

/*let original = new Roll("Original", "Sugar Milk", "1", 2.49);
let walnut = new Roll("Walnut", "Vanilla Milk", "12", 3.49);
let raisin = new Roll("Raisin", "Sugar Milk", "3", 2.99);
let apple = new Roll("Apple", "Keep Original", "3", 3.49);

cartItems.add(original);
cartItems.add(walnut);
cartItems.add(raisin);
cartItems.add(apple);*/

let glazeDictionary = {"Keep Original": 0, "Sugar Milk": 0, "Vanilla Milk": 0.5, "Double Chocolate": 1.5};
let packConversions = {"1": 1, "3": 3, "6": 5, "12": 10};

function priceCaluculation(roll){
    let glazeCost = glazeDictionary[roll.glazing];
    let packDiscount = packConversions[roll.size];
    let rollPackCost = (roll.basePrice + glazeCost) * packDiscount;
    return rollPackCost;
}

let checkoutTotal = 0;
let total = document.querySelector("#totalPrice");

/*function updateTotalPrice(){
    total.innerHTML = "$" + checkoutTotal.toFixed(2);
    if (cartItems.size == 0){
        total.innerHTML = "$0.00";
    }
}*/

function updateTotalPrice(){
    total.innerHTML = "$" + checkoutTotal.toFixed(2);
    if (cart.size == 0){
        total.innerHTML = "$0.00";
    }
}

function populateCart(roll){
    let template = document.querySelector(".template");
    let clone = template.content.cloneNode(true);

    roll.element = clone.querySelector("#cart");

    let image = clone.querySelector("#cartImage");
    let rollName = clone.querySelector("#descriptionName");
    let glaze = clone.querySelector("#descriptionGlaze");
    let size = clone.querySelector("#descriptionSize");
    let price = clone.querySelector("#descriptionPrice");
    
    image.src = ".././assets/products/" + roll.type.toLowerCase() + "-cinnamon-roll.jpg";
    rollName.innerHTML = roll.type + " Cinnamon Roll";
    glaze.innerHTML = roll.glazing;
    size.innerHTML = "Pack Size: " + roll.size;
    price.innerHTML = "$" + priceCaluculation(roll).toFixed(2);

    let cartContent =  document.querySelector("#cart-content");
    cartContent.appendChild(clone);

    let removeBtn = roll.element.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
        deleteRoll(roll);
    });

    checkoutTotal = checkoutTotal + priceCaluculation(roll);
    updateTotalPrice();
}

/*for(const roll of cartItems){
    populateCart(roll);
}*/
let cart = new Set();

/*function deleteRoll(roll) {
    roll.element.remove();
    cart.delete(roll);
    checkoutTotal = checkoutTotal - priceCaluculation(roll);
    updateTotalPrice();
  }*/

  function deleteRoll(roll) {
    roll.element.remove();
    cart.delete(roll);

    let arrayForCart = Array.from(cart);
    let cartString = JSON.stringify(arrayForCart);
    localStorage.setItem("storedRolls", cartString);
    
    checkoutTotal = checkoutTotal - priceCaluculation(roll);
    updateTotalPrice();
  }



/*function makeNewRoll(imageURL, name, glaze, size, price){
    const roll = new Roll(name, glaze, size, price);
    cart.add(roll);
    return roll;
}*/
  
  function retrieveFromLocalStorage() {

    let cartString = localStorage.getItem("storedRolls");
    let cartArray = JSON.parse(cartString);

    for (const rollData of cartArray) {
        let glazing = rollData.glazing;

        const roll = new Roll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
        cart.add(roll);
    }

    for(const roll of cart){
        populateCart(roll);
    }
  }
  
  if (localStorage.getItem("storedRolls") != null) {
    retrieveFromLocalStorage();
  }




