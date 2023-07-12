import { SetMetadata } from '@nestjs/common';
import { EXAMPLE_SYMBOL } from '../configs/env';

export function Example(name: string) {
  const lowerCaseName = name.toLowerCase();
  return SetMetadata(EXAMPLE_SYMBOL, lowerCaseName);
}
