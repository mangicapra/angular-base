import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'photos',
  modelEndpointUrl: 'photos',
})
export class Photo extends JsonApiModel {
  @Attribute()
  title: string;

  @Attribute()
  uri: string;
}
