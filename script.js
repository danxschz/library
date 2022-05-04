// User library
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Main functions

// Add book to library
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

function addBookToLibrary() {
  // If any value is empty, do nothing
  if (title.value === '' || author.value === '' || pages.value === '') return;
  newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);
}

// Reset book form inputs
function resetInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

// Display books
const booksContainer = document.querySelector('.books');

function displayBooks() {
  let bookContainer;

  let bookInfo;
  let bookTitle;
  let bookAuthor;
  let bookPages;
  let bookRead;
  let readStr;

  let bookIcons;
  let spanReadIcon;
  let readIcon;
  let deleteIcon;
  let spanDeleteIcon;

  let i = 0;
  let j = 0;
  for (book of myLibrary) {
    bookContainer = document.createElement('div');
    bookContainer.classList.add('books__book');

    bookInfo = document.createElement('div');
    bookInfo.classList.add('book__info');

    bookTitle = document.createElement('div');
    bookTitle.classList.add('book__title');
    bookTitle.textContent = (book['title']);
    bookInfo.appendChild(bookTitle);

    bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book__author');
    bookAuthor.textContent = (book['author']);
    bookInfo.appendChild(bookAuthor);

    bookPages = document.createElement('div');
    bookPages.classList.add('book__pages');
    bookPages.textContent = (`${book['pages']} pages`);
    bookInfo.appendChild(bookPages);

    bookRead = document.createElement('div');
    bookRead.classList.add('book__read');
    readStr = (book['read']) ? 'Read' : 'Not read';
    bookRead.textContent = (readStr);
    bookInfo.appendChild(bookRead);

    bookIcons = document.createElement('div');
    bookIcons.classList.add('book__icons');

    spanReadIcon = document.createElement('span');
    spanReadIcon.classList.add('read-icon');
    spanReadIcon.setAttribute('data-index', i++);
    readIcon = document.createElement('i');
    readIcon.setAttribute('class', 'fa-brands fa-readme');
    spanReadIcon.appendChild(readIcon);
    bookIcons.appendChild(spanReadIcon);

    spanDeleteIcon = document.createElement('span');
    spanDeleteIcon.classList.add('delete-icon');
    spanDeleteIcon.setAttribute('data-index', j++);
    deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fa-solid fa-circle-xmark');
    spanDeleteIcon.appendChild(deleteIcon);
    bookIcons.appendChild(spanDeleteIcon);

    bookContainer.appendChild(bookInfo);
    bookContainer.appendChild(bookIcons);
    booksContainer.appendChild(bookContainer);
  }
}

// Clear display
function clearDisplay() {
  const books = document.querySelectorAll('.books__book');
  books.forEach(book => book.remove());
}

// Toggle book form
const bookForm = document.querySelector('.book-form');
const addBookButton = document.querySelector('.add-book');
const overlay = document.querySelector('.overlay');

let formOpen = false;
function toggleForm() {
  if (formOpen) {
    bookForm.style.transform = 'scale(0)';
    addBookButton.style.transform = 'rotate(0)';
    overlay.style.opacity = 0;
    formOpen = false;
  } else {
    bookForm.style.transform = 'scale(1)';
    addBookButton.style.transform = 'rotate(45deg)';
    overlay.style.opacity = 1;
    formOpen = true;
  }
}

// Change read status
function changeReadStatus(indexNumber) {
  if (myLibrary[indexNumber]['read']) {
    myLibrary[indexNumber]['read'] = false;
  } else {
    myLibrary[indexNumber]['read'] = true;
  }
}

function setReadStatusEvents() {
  let readStatusButtons = document.querySelectorAll('.read-icon');
  readStatusButtons.forEach(readStatusButton => {
    readStatusButton.addEventListener('click', () => {
      changeReadStatus(readStatusButton.getAttribute('data-index'));
      clearDisplay();
      displayBooks();
      setReadStatusEvents();
      setDeleteBookEvents();
    });
  });
}

// Delete book
function deleteBook(indexNumber) {
  myLibrary.splice(indexNumber, 1);
}

function setDeleteBookEvents() {
  let deleteBookButtons = document.querySelectorAll('.delete-icon');
  deleteBookButtons.forEach(deleteBookButton => {
    deleteBookButton.addEventListener('click', () => {
      deleteBook(deleteBookButton.getAttribute('data-index'));
      clearDisplay();
      displayBooks();
      setReadStatusEvents();
      setDeleteBookEvents();
    });
  });
}

// Events

// Add book button
addBookButton.addEventListener('click', toggleForm);

// Submit button
const submitButton = document.querySelector('.book-form__submit');
submitButton.addEventListener('click', () => {
  addBookToLibrary();
  resetInputs();
  clearDisplay();
  displayBooks();
  setReadStatusEvents();
});




