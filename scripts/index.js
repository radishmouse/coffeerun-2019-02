// ============================================
// Constants
// ============================================
const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';
const LIST_AREA = '[data-listing]';

// ============================================
// DOM Element Creation
// ============================================

function emailElement(email) {
  const emailAnchor = document.createElement('a');
  emailAnchor.textContent = email;

  const emailItem = document.createElement('li');
  emailItem.appendChild(emailAnchor);

  return emailItem;
}

function drawSingleEmailToList(email) {
  const listArea = document.querySelector(LIST_AREA);
  listArea.appendChild(emailElement(email));  
}

function drawAllEmailsToList(emailArray) {
  emailArray.forEach(drawSingleEmailToList);  
}


// ============================================
// Data manipulation functions
// ============================================

function getEmails(coffeeOrdersObject) {
  return Object.keys(coffeeOrdersObject);
}


// ============================================
// API functions
// ============================================

function getCoffeeOrders() {
  fetch(API_URL)
    .then(function (response) { return response.json(); })
    .then(function (coffeeOrdersObject) {
      // console.log(getEmails(coffeeOrdersObject));
      drawAllEmailsToList(getEmails(coffeeOrdersObject));
      
      return coffeeOrdersObject;
    });
}


// ============================================
// Main
// ============================================

function main() {
  getCoffeeOrders();
}

main();
