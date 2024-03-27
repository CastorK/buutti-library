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
  const [activeBook, setActiveBook] = useState<Book>({id: -1, title: '', author: '', description: ''});

  const handleBookFieldChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveBook((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!(event.nativeEvent instanceof SubmitEvent)) return;
    switch (event.nativeEvent.submitter?.id) {
      case 'saveNew': console.log('Save new book!'); return;
      case 'save': console.log('Modify current book!'); return;
      case 'delete': console.log('Delete current book!'); return;
      default: return;
    }
  }

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
        <div className='p-12 grow'>
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='flex'>
              <label htmlFor="title" className='pr-4 font-bold w-1/6'>Title</label>
              <input className="border-2 p-1 rounded-lg" id="title" name="title" type="text" placeholder='Title of the book' value={activeBook.title} onChange={handleBookFieldChange}></input>
            </div>
            <div className='flex'>
              <label htmlFor="author" className='pr-4 font-bold w-1/6'>Author</label>
              <input className="grow border-2 p-1 rounded-lg" id="author" name="author" type="text" placeholder='Author of the book' value={activeBook.author} onChange={handleBookFieldChange}></input>
            </div>
            <div className='flex'>
              <label htmlFor="description" className='pr-4 font-bold w-1/6'>Description</label>
              <textarea className="border-2 grow rounded-lg p-1" rows={15} id="description" name="description" placeholder='Description of the book' value={activeBook.description} onChange={handleBookFieldChange}></textarea>
            </div>
            <div className='flex gap-4 justify-center pt-8'>
              <button type='submit' id="saveNew" className='bg-blue-700 py-2 px-4 rounded-lg border-2 border-blue-800 text-white enabled:hover:bg-blue-800 disabled:bg-gray-400 disabled:text-black disabled:opacity-70' disabled={activeBook.id < 0}>Save New</button>
              <button type='submit' id="save" className='bg-green-700 py-2 px-4 rounded-lg border-2 border-green-800 text-white enabled:hover:bg-green-800 disabled:bg-gray-400 disabled:text-black disabled:opacity-70' disabled={activeBook.id < 0}>Save</button>
              <button type='submit' id="delete" className='bg-red-700 py-2 px-4 rounded-lg border-2 border-red-800 text-white enabled:hover:bg-red-800 disabled:bg-gray-400 disabled:text-black disabled:opacity-70' disabled={activeBook.id < 0}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
