import columnify from 'columnify';

export const consoleMessages = {
  titleMessage: () => {
    console.log('\x1b[36m%s\x1b[0m', '\nWelcome to Zendesk search:');
  },

  subtitleMessage: () => {
    console.log(`\nPlease select on which the search should be based on:`);
  },

  optionSelectedMessage: item => {
    console.log(`\nYou selected: ${item}`);
  },

  alertMessage: content => {
    console.log('\x1b[31m%s\x1b[0m', content);
  },

  quitApplicationMessage: () => {
    console.log(`\nQuitting Application...`);
  },

  alignMessageContent: (content, columnTitle) => {
    console.log('\n' + columnify(content, { columns: columnTitle }));
  },
};
