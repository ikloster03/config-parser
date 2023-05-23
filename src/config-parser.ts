import { join } from 'path';
import { IExtensionProvider } from './extension-provider.interface';
import RcParser from './rc-parser';
import { getFileExtension } from './tools';
import { Filename, Filepath } from './types';
import { EMPTY, ZERO } from './const';

export type ConfigProvider<T = unknown> = {
  provider: IExtensionProvider<T>;
  extensions: string[];
};

export type Config<T = unknown> = {
  path: string;
  providers: ConfigProvider<T>[];
};

export class ConfigParser<T = unknown> {
  public readonly path: string;

  public readonly providers: ConfigProvider<T>[];

  private rcParser: RcParser<T>;

  private constructor(path: Filepath, providers: ConfigProvider<T>[]) {
    this.path = path;
    this.providers = providers;
    this.rcParser = new RcParser<T>();
  }

  static register<T = unknown>(config: Config<T>): ConfigParser<T> {
    if (config.path === EMPTY) {
      throw new Error('path is empty');
    }

    if (config.providers.length === ZERO) {
      throw new Error('providers is empty');
    }

    return new ConfigParser<T>(config.path, config.providers);
  }

  async parse(rcFileName: Filename): Promise<T> {
    const fileExtension = getFileExtension(rcFileName);

    const currentProvider = this.providers.find(
      (provider) => provider.extensions.includes(fileExtension),
    );

    if (!currentProvider) {
      throw new Error('provider not found');
    }

    this.rcParser.setProvider(currentProvider.provider);

    const filepath: Filepath = join(this.path, rcFileName);

    return this.rcParser.parse(filepath);
  }
}
