import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'credentials',
  modelEndpointUrl: 'login'
})
export class Login extends JsonApiModel {
  @Attribute()
  email: string;

  @Attribute()
  password: string;
}
