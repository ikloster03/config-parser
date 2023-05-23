import { ConfigParser, ConfigProvider } from '../src/config-parser';
import JsonExtensionProvider from '../src/providers/json-extension-provider';

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

      const resultTest: Data = { test: true };
      const rcFileName = '.testrc.json';
      const result = await configParser.parse(rcFileName);

      expect(result).toStrictEqual(resultTest);
    });
});
