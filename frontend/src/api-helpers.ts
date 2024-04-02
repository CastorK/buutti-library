import { Book } from "./App";

/**
 * Creates a new book
 *
 * @async
 * @param {Book} activeBook - The book to be created
 * @returns {Promise<Book>} The newly created book
 * @throws {Error} Will throw Error if either the data isn't valid or the request fails
 */
async function saveNewBook(activeBook: Book): Promise<Book> {
  const { ['id']: id, ...postData} = activeBook;
  const errorFields = [];

  // Validate data
  if (postData.title == '') {
    errorFields.push('title');
  }
  if (postData.author == '') {
    errorFields.push('author');
  }
  if (postData.description == '') {
    errorFields.push('description');
  }
  if (errorFields.length > 0) {
    throw new Error(`Error: fields: [${errorFields.join(", ")}] are required!`);
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  };

  const res = await fetch('/api/books', requestOptions);
  if (!res.ok) {
    throw new Error(`(${res.status}) ${res.statusText}`);
  }
  const newBook: Book = await res.json();
  return newBook;
}


/**
 * Updates the data of a book
 *
 * @async
 * @param {Book} modifiedBook - The new data of the book
 * @returns {Promise<Book>} The updated book
 * @throws {Error} Will throw Error if either the data isn't valid or the request fails
 */
async function saveBook(modifiedBook: Book): Promise<Book> {
  const errorFields = [];

  // Validate data
  if (modifiedBook.title == '') {
    errorFields.push('title');
  }
  if (modifiedBook.author == '') {
    errorFields.push('author');
  }
  if (modifiedBook.description == '') {
    errorFields.push('description');
  }
  if (errorFields.length > 0) {
    throw new Error(`Error: fields: [${errorFields.join(", ")}] are required!`);
  }

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(modifiedBook)
  };

  const res = await fetch(`/api/books/${modifiedBook.id}`, requestOptions);
  if (!res.ok) {
    throw new Error(`(${res.status}) ${res.statusText}`);
  }
  return modifiedBook;
}


/**
 * Description placeholder
 *
 * @async
 * @param {Book} bookToBeRemoved - The book that should be deleted
 * @returns {Promise<void>}
 * @throws {Error} Will throw Error if the request fails
 */
async function deleteBook(bookToBeRemoved: Book): Promise<void> {
  const res = await fetch(`/api/books/${bookToBeRemoved.id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`(${res.status}) ${res.statusText}`);
  }
}

export { saveNewBook, saveBook, deleteBook };