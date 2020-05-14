import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'auths',
  modelEndpointUrl: 'refresh'
})
export class Refresh extends JsonApiModel {
  @Attribute()
  accessToken: string;

  @Attribute()
  refreshToken: string;
}
