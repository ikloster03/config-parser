import { hello } from '../src';

describe('test', () => {
  it('hello', () => {
    expect(hello()).toBe('hello');
  });
});
