import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemoService } from '../../service/demo.service';
import { Author } from '../../model';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-demo-api-example',
  templateUrl: './demo-api-example.component.html',
  styleUrls: ['./demo-api-example.component.scss'],
})
export class DemoApiExampleComponent implements OnInit, OnDestroy {
  public perPage = 10;
  public p = 1;
  public authors: Author[];
  public searchList: { name: string; id: string }[];
  public selectedVal: string;
  public pages = [
    { value: 1, name: '10' },
    { value: 2, name: '20' },
    { value: 3, name: '50' },
  ];

  private getAuthors$ = new Subject();

  constructor(private store: DemoService) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.getAuthors$.next();
    this.getAuthors$.complete();
  }

  getAuthors(): void {
    this.store
      .findAll(Author, {
        include: 'books,photos',
        page: { size: this.perPage, number: this.p },
        filter: { name: this.selectedVal },
      })
      .pipe(takeUntil(this.getAuthors$))
      .subscribe((authors: JsonApiQueryData<Author>) => {
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

  handleEnteredTerm(name): void {
    this.store
      .findAll(Author, {
        filter: { name },
      })
      .subscribe((authors: JsonApiQueryData<Author>) => {
        this.searchList = authors
          .getModels()
          .map((author: Author) => ({ name: author.name, id: author.id }));
      });
  }

  handleDropdownSearchSelect(ev): void {
    this.selectedVal = ev.name;
    this.p = 1;
    this.getAuthors();
  }
}
