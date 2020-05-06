import { Component, OnInit } from '@angular/core';
import { DemoService } from '../services/demo.service';
import { Author } from '../models/author';
import { JsonApiQueryData } from 'angular2-jsonapi';

@Component({
  selector: 'app-api-example',
  templateUrl: './api-example.component.html',
  styleUrls: ['./api-example.component.scss'],
})
export class ApiExampleComponent implements OnInit {
  perPage = 10;
  p = 1;
  authors: Author[];

  constructor(private store: DemoService) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.store
      .findAll(Author, {
        include: 'books,photos',
        page: { size: this.perPage, number: this.p },
      })
      .subscribe((authors: JsonApiQueryData<Author>) => {
        console.log(authors.getModels());
        this.authors = authors.getModels();
      });
  }

  handlePerPageChange(ev): void {
    this.perPage = Number(ev.name);
    this.p = 1;
    this.getAuthors();
  }

  handlePageChange(ev): void {
    this.p = ev === '' ? 1 : ev;
    this.getAuthors();
  }
}
