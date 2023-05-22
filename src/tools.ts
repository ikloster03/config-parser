import { Filepath } from './types';

export const hasJsExtension = (filePath: Filepath): boolean => {
  const JS_EXTENSIONS = ['js', 'ts', 'cjs', 'mjs'];

  const fileExtension = filePath.split('.').pop();

  return JS_EXTENSIONS.includes(fileExtension);
};
