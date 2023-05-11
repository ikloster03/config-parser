export interface IExtensionProvider {
  parse(file: string): unknown;
}
