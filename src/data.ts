const { parser } = require('stream-json/Parser');
const fs = require('fs');

const pipeline = fs.createReadStream(__dirname + '/asset/json/users.json').pipe(parser());

export function getAvailableSearchFields(path: string) {
  console.log(pipeline);
  return Object.keys(require(path)[0]); //assuming the object structure is same
}
