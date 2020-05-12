import { Injectable } from '@angular/core';
import {
  DatastoreConfig,
  JsonApiDatastoreConfig,
  JsonApiDatastore,
} from 'angular2-jsonapi';
import { HttpClient } from '@angular/common/http';
import { Author, Photo, Serie, Book, Chapter, Store } from '../model';

const config: DatastoreConfig = {
  baseUrl: 'https://jsonapiplayground.reyesoft.com/v2',
  models: {
    authors: Author,
    photos: Photo,
    series: Serie,
    books: Book,
    chapters: Chapter,
    stores: Store,
  },
};

@Injectable({
  providedIn: 'root',
})
@JsonApiDatastoreConfig(config)
export class DemoService extends JsonApiDatastore {
  constructor(public http: HttpClient) {
    super(http);
  }
}
