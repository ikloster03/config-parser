import { IExtensionProvider } from '../extension-provider.interface';

export default class JsonExtensionProvider implements IExtensionProvider {
  async parse(file: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(file));
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
