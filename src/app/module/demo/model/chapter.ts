import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  BelongsTo,
  HasMany,
} from 'angular2-jsonapi';
import { Photo } from './photo';
import { Book } from './book';

@JsonApiModelConfig({
  type: 'chapters',
  modelEndpointUrl: 'chapters',
})
export class Chapter extends JsonApiModel {
  @Attribute()
  title: string;

  @Attribute()
  ordering: number;

  @HasMany()
  photos: Photo[];

  @BelongsTo()
  books: Book[];
}
