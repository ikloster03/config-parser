import { IExtensionProvider } from '../extension-provider.interface';
import { FileBody } from '../types';

export default class JsonExtensionProvider<T = unknown> implements IExtensionProvider<T> {
  async parse(file: FileBody): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(file));
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
