import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../../service/demo.service';
import { Author } from '../../model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-demo-author',
  templateUrl: './demo-author.component.html',
  styleUrls: ['./demo-author.component.scss'],
})
export class DemoAuthorComponent implements OnInit, OnDestroy {
  public author: Author;

  private id: string;
  private getAuthor$ = new Subject();
  private updateAuthor$ = new Subject();

  constructor(private route: ActivatedRoute, private store: DemoService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.peekRecord(Author, this.id) === null
      ? this.getAuthor()
      : (this.author = this.store.peekRecord(Author, this.id));
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.getAuthor$.next();
    this.getAuthor$.complete();
    this.updateAuthor$.next();
    this.updateAuthor$.complete();
  }
  getAuthor(): void {
    this.store
      .findRecord(Author, this.id, {
        include: 'books,photos',
      })
      .pipe(takeUntil(this.getAuthor$))
      .subscribe((author: Author) => {
        this.author = author;
      });
  }

  updateAuthorName(name): void {
    const NEW_NAME = prompt('Change author name', name);
    if (NEW_NAME !== null) {
      this.store
        .findRecord(Author, this.id, {
          include: 'books,photos',
        })
        .pipe(takeUntil(this.updateAuthor$))
        .subscribe((author: Author) => {
          author.name = NEW_NAME;
          // this is required to make HTTP request
          author
            .save()
            .pipe(takeUntil(this.getAuthor$))
            // subscribe is a must call, even if it's left empty because cold http method returs cold Observable
            // it starts running upon subscription
            .subscribe((newAuthor: Author) => (this.author = newAuthor));
        });
    }
  }
}
