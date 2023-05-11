import * as path from 'path';
import * as fs from 'fs';
import YamlExtensionProvider from '../../src/providers/yaml-extension-provider';

describe('YAML Extension Provider', () => {
  it('should parse successfully', () => {
    const resultTest = { test: true };
    const filePath = path.join(__dirname, './test.yaml');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new YamlExtensionProvider();

    const result = provider.parse(file);

    expect(result).toStrictEqual(resultTest);
  });

  it('should parse successfully', () => {
    const filePath = path.join(__dirname, './test-wrong.yaml');
    const file = fs.readFileSync(filePath, 'utf8');
    const provider = new YamlExtensionProvider();

    const result = () => provider.parse(file);

    expect(result).toThrow(/Nested mappings are not allowed in compact mappings at line 1, column 7:/i);
  });
});
