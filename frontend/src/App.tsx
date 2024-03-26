import { useState } from 'react'

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const TEST_DATA: Book[] = [
  {id:1, title: "First", author: "Stoneman", description: "I'm the first book ever made!"},
  {id:2, title: "Second", author: "Bronzeman", description: "Ironically, the second book written by BRONZEman"},
  {id:3, title: "Third", author: "Ironman", description: "TOO DOO TOO DOO DOO TODODODODO DOO DOO DO DO"},
  {id:4, title: "Fourth", author: "Mr. Fantastic", description: "Four is a good number"},
  {id:5, title: "Mumbo no 5", author: "Lou Bega", description: "A little bit of many women"},
]

function App() {
  const [books, setBooks] = useState<Book[]>(TEST_DATA);
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold py-20'>Welcome to Castor's library!</h1>
      <div className='flex w-min justify-center border-2 rounded-lg'>
        <div className='basis-1 border-r-2 p-12'>
          <table>
            <tbody>
              {books.map(book => (
                <tr onClick={() => setActiveBook(book)}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='basis-1 p-12'>
          <form>
            <label htmlFor="title" className='block'>Title</label>
            <input className="border-2" id="title" name="title" type="text" placeholder='Title of the book' value={activeBook?.title}></input>

            <label htmlFor="author" className='block'>Author</label>
            <input className="border-2" id="author" name="author" type="text" placeholder='Author of the book' value={activeBook?.author}></input>

            <label htmlFor="description" className='block'>Description</label>
            <textarea className="border-2" id="description" rows={4} cols={50} name="description" value={activeBook?.description} placeholder='Description of the book'></textarea>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
