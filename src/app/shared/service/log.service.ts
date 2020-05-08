import { Injectable } from '@angular/core';
import { LogLevel, LogPublisher } from '@shared/model';
import { LogPublishersService } from './log-publishers.service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private level: LogLevel = LogLevel.All;
  private logWithDate = true;
  private publishers: LogPublisher[];

  constructor(private publisherService: LogPublishersService) {
    this.publishers = this.publisherService.publishers;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let entry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      for (let logger of this.publishers) {
        logger.log(entry);
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }
    return ret;
  }
}

export class LogEntry {
  entryDate = new Date();
  message = '';
  level = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;

  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }
    ret += `Type: ${LogLevel[this.level]}`;
    ret += ` - Message: ${this.message}`;
    if (this.extraInfo.length) {
      ret += ` - Extra Info: \n ${this.formatParams(this.extraInfo)}`;
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret = params.join(', \n');
    if (params.some((p) => typeof p === 'object')) {
      ret = '';
      for (let item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}
