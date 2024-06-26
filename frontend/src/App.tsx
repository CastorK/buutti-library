import { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { deleteBook, saveBook, saveNewBook } from './api-helpers';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeBook, setActiveBook] = useState<Book>({id: -1, title: '', author: '', description: ''});
  const [bookIsModified, setBookIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) {
          throw new Error(`(${res.status}) ${res.statusText}`);
        }
        const booksData: { [key:string] : Book } = await res.json();
        setBooks(Object.values(booksData));
      } catch (err) {
        setIsError(true);
        setErrorMsg(String(err));
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [])

  const handleBookFieldChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newActiveBook = {
      ...activeBook,
      [e.target.name]: e.target.value
    }
    setActiveBook(newActiveBook);
    setBookIsModified(Boolean(newActiveBook.title && newActiveBook.author && newActiveBook.description));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!(event.nativeEvent instanceof SubmitEvent)) return;

    switch (event.nativeEvent.submitter?.id) {
      case 'saveNew': handleSaveNewBook(); return;
      case 'save': handleSaveBook(); return;
      case 'delete': handleDeleteBook(); return;
      default: return;
    }
  }

  function handleSaveNewBook() {
    const saveNewBookAsync = async () => {
      try {
        const newBook = await saveNewBook(activeBook);
        setBooks(books.concat(newBook));
        setActiveBook(newBook);
        setBookIsModified(false);
      } catch (err) {
        setIsError(true);
        setErrorMsg(String(err));
      }
    }

    saveNewBookAsync();
  }

  function handleSaveBook() {
    const saveBookAsync = async () => {
      try {
        const updatedBook = await saveBook(activeBook);
        setBooks(books.filter( book => book.id != updatedBook.id).concat(updatedBook))
        setActiveBook(updatedBook);
        setBookIsModified(false);
      } catch (err) {
        setIsError(true);
        setErrorMsg(String(err));
      }
    }

    saveBookAsync();
  }

  function handleDeleteBook() {
    const deleteBookAsync = async () => {
      try {
        await deleteBook(activeBook);
        setBooks(books.filter(book => book.id != activeBook.id))
        setActiveBook({id: -1, title: '', author: '', description: ''});
        setBookIsModified(false);
      } catch (err) {
        setIsError(true);
        setErrorMsg(String(err));
      }
    }

    deleteBookAsync();
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold pt-20 pb-7'>Welcome to Castor's library!</h1>
      <div className={`absolute top-1/2 ${isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <Spinner />
      </div>
      <div className="w-[50vw] py-2 bg-red-600 rounded-lg text-center font-bold text-2xl" hidden={!isError}>
        {errorMsg}
      </div>
      <div className={`flex w-[80vw] mt-7 border-2 rounded-lg transition-opacity duration-300 delay-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className='min-w-[30vw] basis-1 border-r-2 p-2'>
          {books.map(book => (
            <div key={book.id} className={`flex flex-col border-b-2 hover:bg-gray-200 cursor-pointer ${book.id == activeBook.id ? "bg-gray-100" : ""}`} onClick={() => setActiveBook(book)}>
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
              <button type='submit' id="saveNew" className='bg-blue-700 py-2 px-4 rounded-lg border-2 border-blue-800 text-white enabled:hover:bg-blue-800 disabled:bg-gray-400 disabled:text-black disabled:opacity-70' disabled={!bookIsModified}>Save New</button>
              <button type='submit' id="save" className='bg-green-700 py-2 px-4 rounded-lg border-2 border-green-800 text-white enabled:hover:bg-green-800 disabled:bg-gray-400 disabled:text-black disabled:opacity-70' disabled={activeBook.id < 0 || !bookIsModified}>Save</button>
              <button type='submit' id="delete" className='bg-red-700 py-2 px-4 rounded-lg border-2 border-red-800 text-white enabled:hover:bg-red-800 disabled:bg-gray-400 disabled:text-black disabled:opacity-70' disabled={activeBook.id < 0}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
