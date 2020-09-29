import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:8000/articles');
  }

  getArticle(key: string): Observable<Article> {
    return this.http.get<Article>('http://localhost:8000/articles/' + key);
  }

}
