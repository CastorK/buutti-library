import express from 'express';
require('dotenv').config();

interface DefaultResponse {
  message: string;
}

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get<{}, DefaultResponse>('/', (req, res) => {
  res.json({
    message: 'You have been responded to!',
  });
});

app.listen(port, () => {
  console.log(`Backend started on localhost:${port}`);
})