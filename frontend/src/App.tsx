import { useState } from 'react'
import './App.css'

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const TEST_DATA: Book[] = [
  {id:1, title: "First", author: "Stoneman", description: "Im the first book ever made!"},
  {id:2, title: "Second", author: "Bronzeman", description: "Ironically, the second book written by BRONZEman"},
  {id:3, title: "Third", author: "Ironman", description: "TOO DOO TOO DOO DOO TODODODODO DOO DOO DO DO"},
  {id:4, title: "Fourth", author: "Mr. Fantastic", description: "Four is a good number"},
  {id:5, title: "Mumbo no 5", author: "Lou Bega", description: "A little bit of many women"},
]

function App() {
  const [books, setBooks] = useState<Book[]>(TEST_DATA);

  return (
    <>
      <h1>BOOKS</h1>
      <table>
        <thead>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
        </thead>
        <tbody>
          {books.map(book => (
            <tr>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
