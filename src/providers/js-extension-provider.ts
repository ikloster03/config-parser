import { IExtensionProvider } from '../extension-provider.interface';

export default class JsExtensionProvider implements IExtensionProvider {
  async parse(filepath: string): Promise<unknown> {
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
