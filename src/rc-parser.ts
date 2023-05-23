import { readFileSync } from 'fs';
import { IExtensionProvider } from './extension-provider.interface';
import { FileBody, Filepath } from './types';
import { hasJsExtension } from './tools';

export default class RcParser<T = unknown> {
  private provider?: IExtensionProvider<T>;

  setProvider(provider: IExtensionProvider<T>) {
    this.provider = provider;

    return this;
  }

  async parse(filePath: Filepath): Promise<T> {
    if (!this.provider) {
      try {
        throw new Error('provider is not set');
      } catch (e) {
        return new Promise((resolve, reject) => {
          reject(e.message);
        });
      }
    }

    if (hasJsExtension(filePath)) {
      return this.provider.parse(filePath);
    }

    const file: FileBody = readFileSync(filePath, 'utf8');

    return this.provider.parse(file);
  }
}
