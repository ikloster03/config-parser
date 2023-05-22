import { IExtensionProvider } from '../extension-provider.interface';
import { Filepath } from '../types';

export default class JsExtensionProvider<T = unknown> implements IExtensionProvider<T> {
  async parse(filepath: Filepath): Promise<T> {
    try {
      const module = await import(filepath);

      return module.default ? module.default : module;
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e.message);
      });
    }
  }
}
