import { getAvailableSearchFields, getAllInfo } from './data';
import { displayAlertContent } from './utils/utilityMethods';
import process from 'process';
import path from 'path';
import readlineSync from 'readline-sync';
import columnify from 'columnify';

const primaryOptions = ['Search Zendesk', 'View a list of searchable fields'];
const searchOptions = ['Users', 'Tickets', 'Organizations'];

const goToHome = (defaultFunction: Function) => {
  const isGoingHome = readlineSync
    .question('\n Do you wanna go home (y/n):')
    .toLowerCase()
    .trim();
  if (isGoingHome === 'y') {
    showInitialSearch();
  } else if (isGoingHome === 'n') {
    defaultFunction();
  } else {
    invalidOperation();
    return goToHome(defaultFunction);
  }
};

const searchZendesk = async () => {
  console.log('\nPlease select on which the search should be based on:');
  const index = readlineSync.keyInSelect(searchOptions, 'Please select your option', {
    cancel: 'Go Back',
  });
  index >= 0 ? console.log('\nYou have selected to ' + primaryOptions[index]) : showInitialSearch();
  console.log('\nYou have selected ' + searchOptions[index]);
  const searchTerm = readlineSync.question('Please enter the search term: ');
  let searchableFields: any = [];
  await getAvailableSearchFields(
    path.join(__dirname, '../asset/json/' + searchOptions[index].toLowerCase() + '.json')
  ).then((result: any) => {
    let searchValue = '';
    Object.keys(result).includes(searchTerm.trim())
      ? ((searchValue = readlineSync.question('Please enter the search value: ')),
        getAllInfo(
          searchTerm,
          searchValue,
          path.join(__dirname, '../asset/json/' + searchOptions[index].toLowerCase() + '.json')
        )
          .then((result: any) => {
            result && result.length > 0
              ? result.map((item: any) => {
                  console.log(
                    '\n' + columnify(item, { columns: ['Terms', 'Values'], columnSplitter: ' | ' })
                  );
                })
              : displayAlertContent('\n No results found');
          })
          .then(() => goToHome(searchZendesk)))
      : (displayAlertContent('\n The value entered is not valid search field'), searchZendesk());
  });
};

const viewSearchField = () => {
  let searchableFields: any = [];
  searchOptions.forEach(async item => {
    await getAvailableSearchFields(
      path.join(__dirname, '../asset/json/' + item.toLowerCase() + '.json')
    )
      .then((result: any) => {
        console.log('\n' + columnify(result, { columns: ['Search ' + item + ' with '] }));
      })
      .then(() => goToHome(quitApplication));
  });
};

const showInitialSearch = () => {
  console.log('\nSelect search options:');
  const index = readlineSync.keyInSelect(primaryOptions, 'Please select your option', {
    cancel: 'Quit',
  });
  index >= 0 ? console.log('\nYou have selected to ' + primaryOptions[index]) : quitApplication();

  switch (index) {
    case 0:
      searchZendesk();
      break;
    case 1:
      viewSearchField();
      break;
    default:
      invalidOperation();
  }
};

const invalidOperation = () => {
  console.log('\n Please select an appropriate value');
};

const quitApplication = () => {
  process.exit();
};

showInitialSearch();
