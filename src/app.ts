import { getAvailableSearchFields, getAllInfo } from './data';
import process from 'process';
import path from 'path';
import readlineSync from 'readline-sync';
import columnify from 'columnify';

const primaryOptions = ['Search Zendesk', 'View a list of searchable fields'];
const searchOptions = ['Users', 'Tickets', 'Organizations'];

console.log('\nSelect search options:');
const index = readlineSync.keyInSelect(primaryOptions, 'Please select your option', {
  cancel: 'Quit',
});
index >= 0 ? console.log('\nYou have selected to ' + primaryOptions[index]) : process.exit();

switch (index) {
  case 0:
    searchZendesk();
    break;
  case 1:
    viewSearchField();
    break;
  default:
    defaultOperation();
}

async function searchZendesk() {
  console.log('\nPlease select on which the search should be based on:');
  const index = readlineSync.keyInSelect(searchOptions, 'Please select your option', {
    cancel: 'Quit',
  });
  console.log('\nYou have selected ' + searchOptions[index]);
  const searchTerm = readlineSync.question('Please enter the search term: ');
  let searchableFields: any = [];
  await getAvailableSearchFields(
    path.join(__dirname, '../asset/json/' + searchOptions[index].toLowerCase() + '.json')
  ).then(result => {
    searchableFields = result;

    let searchValue = '';
    let info: any = [];

    searchableFields.includes(searchTerm.trim())
      ? ((searchValue = readlineSync.question('Please enter the search value: ')),
        getAllInfo(
          searchTerm,
          searchValue,
          path.join(__dirname, '../asset/json/' + searchOptions[index].toLowerCase() + '.json')
        ).then(result => {
          info = result;
          info.map((item: any) => {
            console.log(
              '\n' + columnify(item, { columns: ['Terms', 'Values'], columnSplitter: ' : ' })
            );
          });
        }))
      : console.log('\n The field value entered is not valid search field');
  });
}

function viewSearchField() {
  let searchableFields: any = [];
  searchOptions.forEach(async item => {
    await getAvailableSearchFields(
      path.join(__dirname, '../asset/json/' + item.toLowerCase() + '.json')
    ).then(result => {
      searchableFields = result;
    });
    if (searchableFields) {
      console.log('\nSearch ' + item + ' with \n');
      searchableFields.map((item: any) => {
        console.log(item);
      });
    }
  });
}

function defaultOperation() {
  console.log('\n Please select an appropriate operation');
}
