import { Filepath } from './types';

export const getFileExtension = (filePath: Filepath): string => filePath.split('.').pop();

export const hasJsExtension = (filePath: Filepath): boolean => {
  const JS_EXTENSIONS = ['js', 'ts', 'cjs', 'mjs'];

  const fileExtension = getFileExtension(filePath);

  return JS_EXTENSIONS.includes(fileExtension);
};
