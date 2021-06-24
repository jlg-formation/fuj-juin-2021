import express from 'express';
import {promises} from 'fs';
import path from 'path';
import {Article} from './interfaces/article';

const articleFilename = path.resolve(process.cwd(), './data/articles.json');
let articles: Article[] = [];
(async () => {
  try {
    const str = await promises.readFile(articleFilename, {encoding: 'utf-8'});
    articles = JSON.parse(str);
  } catch (err) {
    console.log('err: ', err);
  }
})();

async function save() {
  await promises.writeFile(articleFilename, JSON.stringify(articles));
}

function getNextSequence() {
  const ids = articles.map(a => a.id).map(id => +id.substring(1));
  return 'a' + (Math.max(...ids) + 1);
}

const app = express.Router();
export const api = app;

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.use(express.json());

app.post('/articles', (req, res) => {
  const article = req.body as Article;
  article.id = getNextSequence();
  articles.push(article);
  save();
  res.json(article);
});

app.delete('/articles', (req, res) => {
  const ids = req.body as string[];
  articles = articles.filter(a => !ids.includes(a.id));
  save();
  res.status(204).end();
});
