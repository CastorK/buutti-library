import { useState } from 'react'

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const TEST_DATA: Book[] = [
  {id:1, title: "The first book", author: "A. Stoneman", description: "I'm the first book ever made!"},
  {id:2, title: "2nd edition", author: "B. Bronzeman", description: "Ironically, the second book written by BRONZEman"},
  {id:3, title: "Third time is a charm", author: "O. Ironman", description: "TOO DOO TOO DOO DOO TODODODODO DOO DOO DO DO"},
  {id:4, title: "Fantastic Four", author: "Mr. Fantastic", description: "Four is a good number"},
  {id:5, title: "Mumbo no 5", author: "Lou Bega", description: "A little bit of many women"},
  {id:6, title: "666", author: "The Devil", description: "A very long description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
]

function App() {
  const [books, setBooks] = useState<Book[]>(TEST_DATA);
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold pt-20 pb-14'>Welcome to Castor's library!</h1>
      <div className='flex w-[80vw] border-2 rounded-lg'>
        <div className='min-w-[30vw] basis-1 border-r-2 p-2'>
          {books.map(book => (
            <div key={book.id} className="flex flex-col border-b-2 hover:bg-gray-100 cursor-pointer" onClick={() => setActiveBook(book)}>
              <div className='flex justify-between'>
                <div className='font-bold'>{book.title}</div>
                <div>{book.author}</div>
              </div>
              <div className='text-gray-600 text-xs truncate overflow-hidden'>{book.description}</div>
            </div>
          ))}
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
