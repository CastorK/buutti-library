import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
require('dotenv').config();

interface DefaultResponse {
  message: string;
}

interface Book {
  id: number,
  title: string,
  author: string,
  description: string,
}

interface Data {
  books: Book[]
}



const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get<{}, DefaultResponse>('/', (req, res) => {
  res.status(200).json({
    message: 'Default response',
  });
});
app.get<{}, DefaultResponse>('/book', (req, res) => {
  res.status(200).json({
    message: 'All books go here',
  });
});
app.get<{id: number}, DefaultResponse>('/book/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Find book with id ${id} and return it`,
  });
});

app.post('/book/:id', (req, res) => {

});

app.listen(port, () => {
  console.log(`Backend started on localhost:${port}`);
});