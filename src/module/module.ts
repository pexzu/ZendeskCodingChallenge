import { getAvailableSearchFields, getAllInfo } from '../data/data';
import { consoleMessages } from '../utils/utilityMethods';
import process from 'process';
import path from 'path';
import readlineSync from 'readline-sync';

const primaryOptions = ['Search Zendesk', 'View a list of searchable fields'];
const searchOptions = ['Users', 'Tickets', 'Organizations'];

export const showInitialSearch = () => {
  consoleMessages.titleMessage();

  const index = readlineSync.keyInSelect(primaryOptions, 'Please select your option number', {
    cancel: 'Quit',
  });

  index === undefined && (invalidOperation(), showInitialSearch());

  index >= 0 ? consoleMessages.optionSelectedMessage(primaryOptions[index]) : quitApplication();

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

const searchZendesk = async () => {
  let searchValue = '';

  consoleMessages.subtitleMessage();

  const index = readlineSync.keyInSelect(searchOptions, 'Please select your option', {
    cancel: 'Go Back',
  });

  index >= 0 ? consoleMessages.optionSelectedMessage(searchOptions[index]) : showInitialSearch();

  const availableSearchTerms = await getAvailableSearchFields(
    path.join(__dirname, '../../asset/json/' + searchOptions[index].toLowerCase() + '.json')
  );

  consoleMessages.alignMessageContent(availableSearchTerms, [
    `AVAILABLE SEARCH TERMS FOR ` + searchOptions[index].toUpperCase(),
  ]);
  const searchTerm = readlineSync.question('\nPlease enter the search term: ');

  if (Object.keys(availableSearchTerms).includes(searchTerm.trim())) {
    (searchValue = readlineSync.question(
      'Please enter the search value (if its a collection of item, just enter one value): '
    )),
      await getAllInfo(
        searchTerm,
        searchValue,
        path.join(__dirname, '../../asset/json/' + searchOptions[index].toLowerCase() + '.json')
      ).then((result: any) => {
        if (result && result.length > 0) {
          result.map((item: any) => {
            consoleMessages.alignMessageContent(item, ['Terms', 'Values']);
          });
        } else {
          consoleMessages.alertMessage('\n No results found');
        }
      }),
      goToHome(searchZendesk);
  } else {
    consoleMessages.alertMessage('\nThe value entered is not valid search field'), searchZendesk();
  }
};

const viewSearchField = async () => {
  for (const item of searchOptions) {
    await getAvailableSearchFields(
      path.join(__dirname, '../../asset/json/' + item.toLowerCase() + '.json')
    ).then((result: any) => {
      consoleMessages.alignMessageContent(result, ['Search ' + item + ' with ']);
    });
  }

  goToHome(quitApplication);
};

const quitApplication = () => {
  consoleMessages.quitApplicationMessage();
  process.exit();
};

const goToHome = (defaultFunction: Function) => {
  const isGoingHome = readlineSync
    .question('\nDo you wanna go home (y/n): ')
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

export const invalidOperation = () => {
  consoleMessages.alertMessage('\nPlease select an appropriate value');
};
