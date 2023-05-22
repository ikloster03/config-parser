import { parse } from 'yaml';
import { IExtensionProvider } from '../extension-provider.interface';
import { FileBody } from '../types';

export default class YamlExtensionProvider<T = unknown> implements IExtensionProvider<T> {
  async parse(file: FileBody): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(parse(file));
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
