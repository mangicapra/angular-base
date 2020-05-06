import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../services/demo.service';
import { Author } from '../models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  id: string;
  author: Author;

  constructor(private route: ActivatedRoute, private store: DemoService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.peekRecord(Author, this.id) === null
      ? this.getAuthor()
      : (this.author = this.store.peekRecord(Author, this.id));
  }
  getAuthor(): void {
    this.store
      .findRecord(Author, this.id, {
        include: 'books,photos',
      })
      .subscribe((author: Author) => {
        console.log(author);
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
        .subscribe((author: Author) => {
          author.name = NEW_NAME;
          // this is required to make HTTP request
          author
            .save()
            // subscribe is a must call, even if it's left empty because cold http method returs cold Observable
            // it starts running upon subscription
            .subscribe((newAuthor: Author) => (this.author = newAuthor));
        });
    }
  }
}
