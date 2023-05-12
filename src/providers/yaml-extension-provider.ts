import { parse } from 'yaml';
import { IExtensionProvider } from '../extension-provider.interface';

export default class YamlExtensionProvider implements IExtensionProvider {
  // eslint-disable-next-line class-methods-use-this
  async parse(file: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        resolve(parse(file));
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
