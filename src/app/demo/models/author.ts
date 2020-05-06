import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
} from 'angular2-jsonapi';
import { Photo } from './photo';
import { Book } from './book';

@JsonApiModelConfig({
  type: 'authors',
  modelEndpointUrl: 'authors',
})
export class Author extends JsonApiModel {
  @Attribute()
  name: string;

  @Attribute()
  birthplace: string;

  @Attribute()
  date_of_birth: string;

  @Attribute()
  date_of_death: string;

  @HasMany()
  photos: Photo[];

  @HasMany()
  books: Book[];
}
