import { SetMetadata } from '@nestjs/common';

export const EXAMPLE_DECORATOR_INDEX = Symbol.for('Example');

export function ExampleDecorator(name: string) {
  const lowerCaseName = name.toLowerCase();
  return SetMetadata(EXAMPLE_DECORATOR_INDEX, lowerCaseName);
}
