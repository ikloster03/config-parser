import { parse } from 'yaml';
import { IExtensionProvider } from '../extension-provider.interface';

export default class YamlExtensionProvider implements IExtensionProvider {
  // eslint-disable-next-line class-methods-use-this
  parse(file: string): unknown {
    return parse(file);
  }
}
