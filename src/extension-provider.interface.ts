export interface IExtensionProvider {
  parse(file: string): Promise<unknown>;
}
