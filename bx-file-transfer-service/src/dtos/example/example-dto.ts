import { IsNumber, IsOptional, IsString } from 'class-validator';

export interface IExampleDto {
  id: number;
  name: string;
  description?: string;
}

export class ExampleDto implements IExampleDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string | undefined;
}
