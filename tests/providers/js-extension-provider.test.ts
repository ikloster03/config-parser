// import * as fs from 'fs';
import * as path from 'path';
import JsExtensionProvider from '../../src/providers/js-extension-provider';

describe('JSON Extension Provider', () => {
  type Data = {
    test: boolean;
  };

  const resultTest: Data = { test: true };

  it('should parse js successfully', async () => {
    const filePath = path.join(__dirname, './test-js.js');
    const provider = new JsExtensionProvider<Data>();

    const result = await provider.parse(filePath);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse ts successfully', async () => {
    const filePath = path.join(__dirname, './test-ts.ts');
    const provider = new JsExtensionProvider<Data>();

    const result = await provider.parse(filePath);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse cjs successfully', async () => {
    const filePath = path.join(__dirname, './test-cjs.cjs');
    const provider = new JsExtensionProvider<Data>();

    const result = await provider.parse(filePath);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse mjs successfully', async () => {
    const filePath = path.join(__dirname, './test-mjs.mjs');
    const provider = new JsExtensionProvider<Data>();

    const result = await provider.parse(filePath);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse js fail', async () => {
    const filePath = path.join(__dirname, './test-wrong-js.js');
    const provider = new JsExtensionProvider<Data>();

    await expect(provider.parse(filePath)).rejects.toMatch(/Unexpected token/i);
  });
});
