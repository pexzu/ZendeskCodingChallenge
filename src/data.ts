import { pipeline } from 'stream';
import fs from 'fs';
import { parser } from 'stream-json';
import Asm from 'stream-json/Assembler';

const getAssembler = (path: string) => {
  const pipeline = fs.createReadStream(path).pipe(parser());
  const asm = Asm.connectTo(pipeline);
  return asm;
};

export const getAvailableSearchFields = (path: string) => {
  const asm = getAssembler(path);
  return new Promise((resolve, reject) => {
    asm.on('done', (asm: any) => {
      const value: Array<string> = asm.current[0];
      if (value) {
        resolve(value);
      }
    });
  }).then(value => {
    return value;
  });
};

export const getAllInfo = (searchTerm: string, searchValue: string, path: string) => {
  const asm = getAssembler(path);
  return new Promise((resolve, reject) => {
    asm.on('done', (asm: any) => {
      const info: Array<string> = asm.current.filter(
        (item: any) =>
          item[searchTerm] &&
          item[searchTerm]
            .toString()
            .toUpperCase()
            .trim() === searchValue.toUpperCase().trim()
      );
      if (info) {
        resolve(info);
      }
    });
  }).then(info => {
    return info;
  });
};
