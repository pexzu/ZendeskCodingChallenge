import { pipeline } from 'stream';
import fs from 'fs';
import { parser } from 'stream-json';
import Asm from 'stream-json/Assembler';

const getAssembler = async (path: string) => {
  const pipeline = await fs.createReadStream(path).pipe(parser());
  const asm = Asm.connectTo(pipeline);
  return asm;
};

export const getAvailableSearchFields = async (path: string) => {
  const asm = await getAssembler(path);
  return new Promise((resolve, reject) => {
    asm.on('done', (asm: any) => {
      const value: Array<string> = asm.current[0];
      if (value) {
        resolve(value);
      }
    });
  })
    .then(value => {
      return value;
    })
    .catch(reason => {
      console.log(reason);
    });
};

export const getAllInfo = async (searchTerm: string, searchValue: string, path: string) => {
  const asm = await getAssembler(path);
  return new Promise((resolve, reject) => {
    asm.on('done', (asm: any) => {
      const info: Array<string> = asm.current.filter((item: any) =>
        Array.isArray(item[searchTerm])
          ? item[searchTerm].some(
              item =>
                item
                  .toString()
                  .toUpperCase()
                  .trim() === searchValue.toUpperCase().trim()
            )
          : item[searchTerm] &&
            item[searchTerm]
              .toString()
              .toUpperCase()
              .trim() === searchValue.toUpperCase().trim()
      );
      if (info) {
        resolve(info);
      }
    });
  })
    .then(info => {
      return info;
    })
    .catch(reason => {
      console.log(reason);
    });
};
