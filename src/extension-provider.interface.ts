import { FileOrFilepath } from './types';

export interface IExtensionProvider<T = unknown> {
  parse(file: FileOrFilepath): Promise<T>;
}
