import { JsonDB, Config } from 'node-json-db';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
require('dotenv').config();

interface Book {
  id: number;
  title: string,
  author: string,
  description: string,
}

interface BookCollection {
  [key: string]: Book
}

interface Data {
  books: BookCollection
}

interface RootResponse {
  tables: string[];
}


const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const db = new JsonDB(new Config("libraryDataBase"));

app.get<{}, RootResponse>('/', async (req, res) => {
  const data = await db.getObject<Data>("/");
  res.status(200).json({
    tables: Object.keys(data)
  });
});
app.get<{}, BookCollection>('/books', async (req, res) => {
  const data = await db.getObject<{ [key: string]: Book }>("/books")
  res.status(200).json(data);
});
app.get<{id: number}, Book>('/books/:id', async (req, res) => {
  const { id } = req.params;
  const data = await db.getObject<Book>(`/books/${id}`);
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Backend started on localhost:${port}`);
});