import { consoleMessages } from './utilityMethods';

it('console.log for title', () => {
  console.log = jest.fn();
  consoleMessages.titleMessage();
  expect(console.log).toHaveBeenCalledWith('\x1b[36m%s\x1b[0m', '\nWelcome to Zendesk search:');
});

it('console.log subtitle', () => {
  console.log = jest.fn();
  consoleMessages.subtitleMessage();
  expect(console.log).toHaveBeenCalledWith(
    '\nPlease select on which the search should be based on:'
  );
});

it('console.log for optionSelected', () => {
  console.log = jest.fn();
  consoleMessages.optionSelectedMessage('test');
  expect(console.log).toHaveBeenCalledWith('\nYou selected: test');
});
