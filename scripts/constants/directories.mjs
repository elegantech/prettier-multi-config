import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '../..');

export const BUILD_DIR = path.resolve(ROOT_DIR, 'build');

export const INTERNAL_DIR = path.resolve(ROOT_DIR, 'build');

export const SRC_DIR = path.resolve(ROOT_DIR, 'src');

// console.log({ __filename, __dirname, outputDirectory });
