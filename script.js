let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
function addBookToLibrary() {
  if (title.value === "" || author.value === "" || pages.value === "") return;
  newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);
}

function resetInputs() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

function displayBooks() {
  const booksContainer = document.querySelector('.books');
  let bookContainer;
  let bookTitle;
  let bookAuthor;
  let bookPages;
  let bookRead;

  for (book of myLibrary) {
    bookContainer = document.createElement('div');
    bookContainer.classList.add('book');

    bookTitle = document.createElement('div');
    bookTitle.classList.add('title')
    bookTitle.textContent = (book['title']);
    bookContainer.appendChild(bookTitle);

    bookAuthor = document.createElement('div');
    bookAuthor.classList.add('author')
    bookAuthor.textContent = (book['author']);
    bookContainer.appendChild(bookAuthor);

    bookPages = document.createElement('div');
    bookPages.classList.add('pages')
    bookPages.textContent = (`${book['pages']} pages`);
    bookContainer.appendChild(bookPages);

    bookRead = document.createElement('div');
    bookRead.classList.add('read')
    bookRead.textContent = (book['read']);
    bookContainer.appendChild(bookRead);

    booksContainer.appendChild(bookContainer);
  }
}

const submitButton = document.querySelector('.book-form__submit');
submitButton.addEventListener('click', () => {
  addBookToLibrary();
  console.log(myLibrary);
  resetInputs();
  displayBooks();
});


const overlay = document.querySelector(".overlay");
const addBook = document.querySelector(".add-book");
const bookForm = document.querySelector(".book-form");

let formOpen = false;
function toggleForm() {
  if (formOpen) {
    bookForm.style.transform = "scale(0)";
    addBook.style.transform = "rotate(0)";
    overlay.style.opacity = 0;
    formOpen = false;
  } else {
    bookForm.style.transform = "scale(1)";
    addBook.style.transform = "rotate(45deg)";
    overlay.style.opacity = 1;
    formOpen = true;
  }
}

addBook.addEventListener("click", toggleForm);