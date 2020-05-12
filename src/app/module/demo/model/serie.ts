import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
} from 'angular2-jsonapi';
import { Photo } from './photo';
import { Book } from './book';

@JsonApiModelConfig({
  type: 'series',
  modelEndpointUrl: 'series',
})
export class Serie extends JsonApiModel {
  @Attribute()
  title: string;

  @HasMany()
  photos: Photo[];

  @HasMany()
  books: Book[];
}
