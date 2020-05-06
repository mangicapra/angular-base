import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
} from 'angular2-jsonapi';
import { Photo } from './photo';
import { Book } from './book';

@JsonApiModelConfig({
  type: 'stores',
  modelEndpointUrl: 'stores',
})
export class Store extends JsonApiModel {
  @Attribute()
  name: string;

  @Attribute()
  address: string;

  @Attribute()
  created_by: number;

  @HasMany()
  photos: Photo[];

  @HasMany()
  books: Book[];

  @HasMany()
  countries: any;
}
