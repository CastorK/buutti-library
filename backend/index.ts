import { JsonDB, Config, DataError } from 'node-json-db';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
require('dotenv').config();

const MAX_ID = 1000000;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(helmet());

const db = new JsonDB(new Config("libraryDataBase", true, true));

interface BookData {
  title: string;
  author: string;
  description: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
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

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function generateUniqueID(existingIDs: number[]): string {
  while (true) {
    const candidateID = getRandomInt(MAX_ID);
    if (!(candidateID in existingIDs)) {
      return String(candidateID);
    }
  }
}

/*******
 * GET *
 *******/
app.get<{}, RootResponse>('/', async (req, res) => {
  try {
    const data = await db.getObject<Data>("/");
    res.status(200).json({
      tables: Object.keys(data)
    }).send();
  } catch (err) {
    res.status(500).send();
  }
  
});

app.get<{}, BookCollection>('/books', async (req, res) => {
  try {
    const data = await db.getObject<{ [key: string]: Book }>("/books")
    res.status(200).json(data).send();
  } catch (err) {
    res.status(500).send();
  }
});

app.get<{id: number}, Book>('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.getObject<Book>(`/books/${id}`);
    res.status(200).json(data).send();
  } catch (err) {
    res.status(500).send();
  }
});

/********
 * POST *
 ********/
app.post<BookData, Book | {error: string}>('/books', async (req, res) => {
  try {
    const bookData: BookData = req.body;
    const bookCollection = await db.getObject<BookCollection>("/books");
  
    const isDuplicate: boolean = Object.values(bookCollection).some(book => book.title == bookData.title && book.author == bookData.author);
    if (isDuplicate) {
      res.status(400).json({error: "Duplicate book with same title and author exists!"}).send();
      return;
    }

    const newId = generateUniqueID(Object.keys(bookCollection).map(stringID => Number(stringID)));
    const newBook = { [newId]: { id: newId, ...bookData } };
    await db.push('/books', newBook, false);
    const insertedBook = await db.getObject<Book>(`/books/${newId}`);
    res.status(201).json(insertedBook).send();
  } catch (err) {
    res.status(500).send();
  }
});

/**********
 * DELETE *
 **********/
app.delete<{id: number}, void>('/books/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const bookCollection = await db.getObject<BookCollection>("/books");
    const bookExists: boolean = Object.values(bookCollection).some(book => book.id == id);
    
    if (!bookExists) {
      res.status(404).send();
      return;
    }

    db.delete(`/books/${id}`);
    res.status(204).send();
  } catch (err) {
    res.status(500).send();
  }
})

/*********
 * PATCH *
 *********/
app.patch('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBookData = req.body;
    const book = await db.getObject<BookCollection>(`/books/${id}`);
    db.push(`/books/${id}`, updatedBookData, false)
    res.status(200).send();
  } catch (err) {
    if (err instanceof DataError) {
      res.status(404).send();
    } 
    else {
      res.status(500).send();
    }
  }
})

app.listen(PORT, () => {
  console.log(`Backend started on localhost:${PORT}`);
});