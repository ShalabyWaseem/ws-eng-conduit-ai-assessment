import { IsString, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateArticleDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    // Handle undefined/null
    if (value === undefined || value === null) {
      return [];
    }
    // If already an array, ensure all elements are strings
    if (Array.isArray(value)) {
      return value.map(item => String(item));
    }
    // If single value, wrap in array
    return [String(value)];
  })
  readonly tagList: string[];
}
