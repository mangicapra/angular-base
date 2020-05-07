import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../../services/demo.service';
import { Author } from '../../models';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-demo-author',
  templateUrl: './demo-author.component.html',
  styleUrls: ['./demo-author.component.scss'],
})
export class DemoAuthorComponent implements OnInit, OnDestroy {
  public author: Author;

  private id: string;
  private subs = new SubSink();

  constructor(private route: ActivatedRoute, private store: DemoService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.peekRecord(Author, this.id) === null
      ? this.getAuthor()
      : (this.author = this.store.peekRecord(Author, this.id));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
  }
  getAuthor(): void {
    this.subs.sink = this.store
      .findRecord(Author, this.id, {
        include: 'books,photos',
      })
      .subscribe((author: Author) => {
        this.author = author;
      });
  }

  updateAuthorName(name): void {
    const NEW_NAME = prompt('Change author name', name);
    if (NEW_NAME !== null) {
      this.subs.sink = this.store
        .findRecord(Author, this.id, {
          include: 'books,photos',
        })
        .subscribe((author: Author) => {
          author.name = NEW_NAME;
          // this is required to make HTTP request
          this.subs.sink = author
            .save()
            // subscribe is a must call, even if it's left empty because cold http method returs cold Observable
            // it starts running upon subscription
            .subscribe((newAuthor: Author) => (this.author = newAuthor));
        });
    }
  }
}
