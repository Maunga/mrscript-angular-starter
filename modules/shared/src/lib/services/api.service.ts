import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  protected server: string;
  protected requireAuthentication: boolean;

  constructor(protected http: HttpClient) {
    this.server = ''; // Should be set by subclasses
    this.requireAuthentication = true;
  }

  private setHeaders(isFile: boolean = false): HttpHeaders {
    const headersConfig = {
      'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  protected get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<T>(`${this.server}${path}`, {
        headers: this.setHeaders(),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  protected getPDF(path: string): Observable<Blob> {
    return this.http
      .get(`${this.server}${path}`, {
        headers: this.setHeaders(),
        responseType: 'blob',
      })
      .pipe(map((res) => new Blob([res], { type: 'application/pdf' })));
  }

  protected keyPost<T>(path: string, body: any = {}): Observable<T> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const options = { headers: headers };
    return this.http
      .post<T>(`${this.server}${path}`, body.toString(), options)
      .pipe(catchError(this.formatErrors));
  }

  protected keyGet<T>(path: string): Observable<T> {
    return this.http
      .get<T>(`${this.server}${path}`, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  protected put<T>(path: string, body: any = {}): Observable<T> {
    return this.http
      .put<T>(`${this.server}${path}`, body, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  protected post<T>(path: string, body: any = {}): Observable<T> {
    return this.http
      .post<T>(`${this.server}${path}`, body, {
        headers: this.setHeaders(),
      })
      .pipe(catchError(this.formatErrors));
  }

  protected file<T>(path: string, file: File): Observable<T> {
    const formData: FormData = new FormData();
    formData.append('document', file, file.name.split('.')[0]);
    return this.http
      .post<T>(`${this.server}${path}`, formData, {
        headers: this.setHeaders(true),
      })
      .pipe(catchError(this.formatErrors));
  }

  protected blob<T>(path: string, file: Blob, fileName: string): Observable<T> {
    const formData: FormData = new FormData();
    formData.append('document', file, fileName);
    return this.http
      .post<T>(`${this.server}${path}`, formData, {
        headers: this.setHeaders(true),
      })
      .pipe(catchError(this.formatErrors));
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http
      .delete<T>(`${this.server}${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors));
  }
}
