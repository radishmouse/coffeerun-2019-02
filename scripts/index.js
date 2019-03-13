// ============================================
// Constants
// ============================================
// const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';
const API_URL = '/coffee.json';

const LIST_AREA = '[data-listing]';

// ============================================
// DOM Element Creation
// ============================================

function emailElement(email) {
  const emailAnchor = document.createElement('a');
  emailAnchor.textContent = email;

  // Setting this as the href, so I can refer to it later.
  emailAnchor.setAttribute('href', email);

  const emailItem = document.createElement('li');
  emailItem.appendChild(emailAnchor);

  return emailItem;
}

function drawSingleEmailToList(email) {
  const listArea = document.querySelector(LIST_AREA);
  const emailItem = emailElement(email);
  listArea.appendChild(emailItem);
  return emailItem;
}

function drawAllEmailsToList(emailArray) {
  return emailArray.map(drawSingleEmailToList);
}

function drawFullOrderToDetail(orderInfo) {
  console.log(orderInfo);
}

function attachListItemHandler(item, coffeeOrdersObject) {
  // We know that each list item looks like this:
  // <li><a href="me@me.com">me@me.com</a></li>
  // We can access the email address by doing this:
  // 1. Get the anchor tag that's inside the <li>
  const anchor = item.querySelector('a');
  // Alternatively, we could have used: item.children[0];

  // 2. Get the value of the "href"
  const email = anchor.getAttribute('href');
  // And as an alternative we could used: anchor.textContent

  // Now, grab the full order for that email address
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const fullOrder = getCoffeeForEmail(email, coffeeOrdersObject);
    drawFullOrderToDetail(fullOrder);    
  });
}


// ============================================
// Data manipulation functions
// ============================================

function getEmails(coffeeOrdersObject) {
  return Object.keys(coffeeOrdersObject);
}

function getCoffeeForEmail(email, coffeeOrdersObject) {
  return coffeeOrdersObject[email];
}


// ============================================
// API functions
// ============================================

function getCoffeeOrders() {
  fetch(API_URL)
    .then(function (response) { return response.json(); })
    .then(function (coffeeOrdersObject) {
      // console.log(getEmails(coffeeOrdersObject));
      const listItems = drawAllEmailsToList(getEmails(coffeeOrdersObject));
      console.log(listItems.length);
      listItems.forEach(function (item) {
        attachListItemHandler(item, coffeeOrdersObject);
      });

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
