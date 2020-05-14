import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage } from '@shared/model';

@Injectable({
  providedIn: 'root',
})
export class LogPublishersService {
  public publishers: LogPublisher[] = [];

  constructor() {
    this.buildPublishers();
  }

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
  }
}
