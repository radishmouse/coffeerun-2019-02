// ============================================
// Constants
// ============================================
const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';

// ============================================
// DOM Element Creation
// ============================================

// ============================================
// API functions
// ============================================

function getCoffeeOrders() {
  fetch(API_URL)
    .then(function (response) { return response.json(); })
    .then(function (coffeeOrdersObject) {
      console.log(coffeeOrdersObject);
    });
}


// ============================================
// Main
// ============================================

function main() {
  getCoffeeOrders();
}

main();
