import * as path from 'path';
import JsonExtensionProvider from '../src/providers/json-extension-provider';
import JsExtensionProvider from '../src/providers/js-extension-provider';
import RcParser from '../src/rc-parser';

describe('RcParser', () => {
  type Data = {
    test: boolean;
  };

  const resultTest: Data = { test: true };
  const rcFileNameJson = path.join(__dirname, './.testrc.json');
  const rcFileNameJs = path.join(__dirname, './.testrc.js');

  it('should set json provider', async () => {
    const rcParser = new RcParser<Data>();
    rcParser.setProvider(new JsonExtensionProvider<Data>());

    const test = await rcParser.parse(rcFileNameJson);

    expect(test).toStrictEqual(resultTest);
  });

  it('should set js provider', async () => {
    const rcParser = new RcParser<Data>();
    rcParser.setProvider(new JsExtensionProvider<Data>());

    const test = await rcParser.parse(rcFileNameJs);

    expect(test).toStrictEqual(resultTest);
  });

  it('shouldn\'t work without provider', async () => {
    const rcParser = new RcParser();

    await expect(rcParser.parse(rcFileNameJson)).rejects.toMatch(/provider is not set/i);
  });
});
