import { ConfigParser, ConfigProvider } from '../src/config-parser';
import JsExtensionProvider from '../src/providers/js-extension-provider';
import JsonExtensionProvider from '../src/providers/json-extension-provider';
import YamlExtensionProvider from '../src/providers/yaml-extension-provider';

describe('ConfigParser', () => {
    type Data = {
      test: boolean;
    };

    const DEFAULT_PROVIDERS: ConfigProvider<Data>[] = [
      {
        provider: new JsonExtensionProvider<Data>(),
        extensions: ['json'],
      },
    ];

    const DEFAULT_PATH = __dirname;

    const resultTest: Data = { test: true };
    const rcFileName = '.testrc.json';

    it('should work default', () => {
      const configParser = ConfigParser.register<Data>({
        path: DEFAULT_PATH,
        providers: DEFAULT_PROVIDERS,
      });

      expect(configParser.path).toBe(DEFAULT_PATH);
      expect(configParser.providers).toBe(DEFAULT_PROVIDERS);
    });

    it('should work with empty path', () => {
      const configParserWrapper = () => ConfigParser.register<Data>({
        path: '',
        providers: DEFAULT_PROVIDERS,
      });

      expect(configParserWrapper).toThrow(/path is empty/i);
    });

    it('should work without providers', () => {
      const configParserWrapper = () => ConfigParser.register<Data>({
        path: DEFAULT_PATH,
        providers: [],
      });

      expect(configParserWrapper).toThrow(/providers is empty/i);
    });

    it('should parse default', async () => {
      const configParser = ConfigParser.register<Data>({
        path: DEFAULT_PATH,
        providers: DEFAULT_PROVIDERS,
      });

      const result = await configParser.parse(rcFileName);

      expect(result).toStrictEqual(resultTest);
    });

    it('should parse without extension', async () => {
      const configParser = ConfigParser.register<Data>({
        path: DEFAULT_PATH,
        providers: [
          {
            provider: new JsonExtensionProvider<Data>(),
            extensions: ['json', ''],
          },
        ],
      });

      const result = await configParser.parse('.testrc');

      expect(result).toStrictEqual(resultTest);
    });

    it('should parse a few providers', async () => {
      const configParser = ConfigParser.register<Data>({
        path: DEFAULT_PATH,
        providers: [
          {
            provider: new JsExtensionProvider<Data>(),
            extensions: ['js', 'ts'],
          },
          {
            provider: new JsonExtensionProvider<Data>(),
            extensions: ['json', ''],
          },
          {
            provider: new YamlExtensionProvider<Data>(),
            extensions: ['yaml'],
          },
        ],
      });

      const resultJs = await configParser.parse('.testrc.js');
      const resultTs = await configParser.parse('.testrc.ts');
      const resultJson = await configParser.parse('.testrc.json');
      const resultWithoutExt = await configParser.parse('.testrc');
      const resultYaml = await configParser.parse('.testrc.yaml');

      expect(resultJs).toStrictEqual(resultTest);
      expect(resultTs).toStrictEqual(resultTest);
      expect(resultJson).toStrictEqual(resultTest);
      expect(resultWithoutExt).toStrictEqual(resultTest);
      expect(resultYaml).toStrictEqual(resultTest);
    });

    it('should work with empty path', async () => {
      const configParser = ConfigParser.register<Data>({
        path: DEFAULT_PATH,
        providers: [
          {
            provider: new JsonExtensionProvider<Data>(),
            extensions: ['testjson'],
          },
        ],
      });

      await expect(configParser.parse(rcFileName)).rejects.toMatch(/provider not found/i);
    });
});
