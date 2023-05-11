import * as fs from 'fs';
import * as path from 'path';
import JsonExtensionProvider from '../../src/providers/json-extension-provider';

describe('JSON Extension Provider', () => {
  it('should parse successfully', () => {
    const resultTest = { test: true };
    const filePath = path.join(__dirname, './test.json');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new JsonExtensionProvider();

    const result = provider.parse(file);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse fail', () => {
    const filePath = path.join(__dirname, './test-wrong.json');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new JsonExtensionProvider();

    const result = () => provider.parse(file);

    expect(result).toThrow(new Error('Unexpected token } in JSON at position 18'));
  });
});
