const { parser } = require('stream-json');
const fs = require('fs');
const Asm = require('stream-json/Assembler');

export function getAvailableSearchFields(path: string) {
  const pipeline = fs.createReadStream(path).pipe(parser());
  const asm = Asm.connectTo(pipeline);
  asm.on('done', (asm: any) => {
    console.log(Object.keys(asm.current[0]));
    return Object.keys(asm.current[0]);
  });
  //   return Object.keys(require(path)[0]); //assuming the object structure is same
}
