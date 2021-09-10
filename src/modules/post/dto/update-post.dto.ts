import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsString({ each: true })
  tags: string[];
}
