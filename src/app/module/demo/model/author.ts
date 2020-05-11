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

  @Attribute({ serializedName: 'date_of_birth' })
  dateOfBirth: string;

  @Attribute({ serializedName: 'date_of_death' })
  dateOfDeath: string;

  @HasMany()
  photos: Photo[];

  @HasMany()
  books: Book[];
}
