import { LogEntry } from '@shared/service';
import { Observable, of } from 'rxjs';

export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    switch (entry.level) {
      case 1:
        console.debug(entry.buildLogString());
        break;

      case 2:
        console.info(entry.buildLogString());
        break;

      case 3:
        console.warn(entry.buildLogString());
        break;
      case 4:
        console.error(entry.buildLogString());
        break;

      default:
        console.log(entry.buildLogString());
        break;
    }
    return of(true);
  }
  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();
    this.location = 'logging';
  }

  log(entry: LogEntry): Observable<boolean> {
    let ret = false;
    let values: LogEntry[];

    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      values.push(entry);
      const CURRENT_SIZE = new Blob(Object.values(localStorage)).size;
      // check if current localStorage value is bigger then 9MB and remove 50 logs
      if (CURRENT_SIZE > 9000000) {
        values.splice(0, 50);
      }
      localStorage.setItem(this.location, JSON.stringify(values));

      ret = true;
    } catch (ex) {
      console.log(ex);
    }

    return of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}
