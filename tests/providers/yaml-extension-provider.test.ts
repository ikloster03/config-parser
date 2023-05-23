import * as path from 'path';
import * as fs from 'fs';
import YamlExtensionProvider from '../../src/providers/yaml-extension-provider';

describe('YAML Extension Provider', () => {
  type Data = {
    test: boolean;
  };

  it('should parse successfully', async () => {
    const resultTest: Data = { test: true };
    const filePath = path.join(__dirname, './test.yaml');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new YamlExtensionProvider<Data>();

    const result = await provider.parse(file);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse successfully', async () => {
    const filePath = path.join(__dirname, './test-wrong.yaml');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new YamlExtensionProvider<Data>();

    await expect(provider.parse(file)).rejects.toMatch(/Nested mappings are not allowed in compact mappings/i);
  });
});
