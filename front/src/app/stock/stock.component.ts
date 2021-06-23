import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.99, qty: 234 },
    { name: 'Marteau', price: 5.26, qty: 12 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
