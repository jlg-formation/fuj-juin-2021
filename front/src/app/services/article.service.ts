import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.99, qty: 234 },
    { name: 'Marteau', price: 5.26, qty: 12 },
  ];

  constructor() {}
}
