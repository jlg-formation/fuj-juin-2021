import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.getArticles();

  constructor() {}

  getArticles() {
    const str = localStorage.getItem('articles');
    if (!str) {
      return [
        { name: 'Tournevis', price: 2.99, qty: 234 },
        { name: 'Marteau', price: 5.26, qty: 12 },
      ];
    }
    return JSON.parse(str);
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  add(article: Article) {
    this.articles.push(article);
    this.save();
  }

  remove(selectedArticles: Set<Article>) {
    this.articles = this.articles.filter((a) => !selectedArticles.has(a));
    this.save();
  }
}
