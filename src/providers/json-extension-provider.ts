import { IExtensionProvider } from '../extension-provider.interface';

export default class JsonExtensionProvider implements IExtensionProvider {
  // eslint-disable-next-line class-methods-use-this
  parse(file: string): unknown {
    return JSON.parse(file);
  }
}
