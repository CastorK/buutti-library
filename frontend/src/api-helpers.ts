import { Book } from "./App";

/**
 * Validates data and sends a posts a new book if data is valid
 *
 * @async
 * @param {Book} activeBook - The book to be created
 * @returns {Promise<Book>} The newly created book
 * @throws {Error} Will throw Error if either the data isn't valid or the request fails
 */
async function saveNewBook(activeBook: Book): Promise<Book> {
  const { ['id']: id, ...postData} = activeBook;
  const errorFields = [];

  // Check for invalid fields
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

export { saveNewBook };