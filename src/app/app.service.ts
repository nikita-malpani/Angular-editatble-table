import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}
  configUrl = 'https://jsonplaceholder.typicode.com/comments';

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
