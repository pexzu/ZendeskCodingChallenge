import { hello, invalidOperation } from './module';

it('console.log the text "hello"', () => {
  console.log = jest.fn();
  invalidOperation();
  expect(console.log).toHaveBeenCalledWith(
    '\x1b[31m%s\x1b[0m',
    '\nPlease select an appropriate value'
  );
});
