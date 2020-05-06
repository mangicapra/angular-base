import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  BelongsTo,
  HasMany,
} from 'angular2-jsonapi';
import { Author } from './author';
import { Photo } from './photo';
import { Serie } from './serie';
import { Chapter } from './chapter';
import { Store } from './store';

@JsonApiModelConfig({
  type: 'books',
  modelEndpointUrl: 'books',
})
export class Book extends JsonApiModel {
  @Attribute()
  title: string;

  @Attribute()
  date_published: string;

  @Attribute()
  isbn: number;

  @BelongsTo()
  author: Author;

  @HasMany()
  chapters: Chapter[];

  @HasMany()
  photos: Photo[];

  @BelongsTo()
  series: Serie;

  @HasMany()
  stores: Store[];
}
