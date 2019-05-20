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
  let value: {} = {};
  return new Promise((resolve, reject) => {
    asm.on('done', (asm: any) => {
      const value: Array<string> = asm.current[0];
      value && resolve(value);
    });
  });
};

export const getAllInfo = async (searchTerm: string, searchValue: string, path: string) => {
  const asm = await getAssembler(path);
  const info: {} = {};
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
      info && resolve(info);
    });
  });
};
