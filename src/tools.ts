import { extname } from 'path';
import { Filepath } from './types';
import { EMPTY } from './const';

export const getFileExtension = (filePath: Filepath): string => {
  const fileExtension = extname(filePath);

  return fileExtension.length > 0 ? fileExtension.slice(1) : EMPTY;
};

export const hasJsExtension = (filePath: Filepath): boolean => {
  const JS_EXTENSIONS = ['js', 'ts', 'cjs', 'mjs'];

  const fileExtension = getFileExtension(filePath);

  return JS_EXTENSIONS.includes(fileExtension);
};
