import * as fs from 'fs';
import * as path from 'path';
import JsonExtensionProvider from '../../src/providers/json-extension-provider';

describe('JSON Extension Provider', () => {
  type Data = {
    test: boolean;
  };

  it('should parse successfully', async () => {
    const resultTest: Data = { test: true };
    const filePath = path.join(__dirname, './test.json');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new JsonExtensionProvider<Data>();

    const result = await provider.parse(file);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse fail', async () => {
    const filePath = path.join(__dirname, './test-wrong.json');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new JsonExtensionProvider<Data>();

    await expect(provider.parse(file)).rejects.toMatch(/Unexpected token/i);
  });
});
