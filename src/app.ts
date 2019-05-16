import { getAvailableSearchFields } from './data';
var path = require('path');

const readlineSync = require('readline-sync');

const primaryOptions = ['Search Zendesk', 'View a list of searchable fields'];
const searchOptions = ['Users', 'Tickets', 'Organizations'];

console.log('\nSelect search options:');
const index = readlineSync.keyInSelect(primaryOptions, 'Please select your option', {
  cancel: 'Quit',
});
console.log('\nYou have selected to ' + primaryOptions[index]);

switch (index) {
  case 0:
    searchZendesk();
    break;
  case 1:
    viewSearchField();
    break;
  default:
    quitOperation();
}

function searchZendesk() {
  console.log('\nPlease select on which the search should be based on:');
  const index = readlineSync.keyInSelect(searchOptions, 'Please select your option', {
    cancel: 'Quit',
  });
  console.log('\nYou have selected ' + searchOptions[index]);
  console.log('\nPlease enter search term:');
}

function viewSearchField() {
  searchOptions.forEach(item => {
    console.log('\nSearch ' + item + ' with \n');
    const value = getAvailableSearchFields(
      path.join(__dirname, '../asset/json/' + item.toLowerCase() + '.json')
    );
    console.log(value);
  });
}

function quitOperation() {
  console.log('\nQuit');
}
