import { invalidOperation } from './module';

it('console.log invalid operation', () => {
  console.log = jest.fn();
  invalidOperation();
  expect(console.log).toHaveBeenCalledWith(
    '\x1b[31m%s\x1b[0m',
    '\nPlease select an appropriate value'
  );
});
