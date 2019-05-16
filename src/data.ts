import { pipeline } from 'stream';

const { parser } = require('stream-json');
const fs = require('fs');
const Asm = require('stream-json/Assembler');

export function getAvailableSearchFields(path: string) {
  const pipeline = fs.createReadStream(path).pipe(parser());
  const asm = Asm.connectTo(pipeline);
  return new Promise((resolve, reject) => {
    asm.on('done', (asm: any) => {
      const value = Object.keys(asm.current[0]);
      if (value) {
        resolve(value);
      }
    });
  }).then(value => {
    // console.log(value);
    return value;
  });
}
