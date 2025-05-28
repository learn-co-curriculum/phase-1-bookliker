const url = 'http://localhost:3000/books'
const bookList = document.querySelector('#list')

document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayAllBooks()
});

const fetchAndDisplayAllBooks = () => {
  fetch(url).then(r => r.json()).then(displayAllBooks)
}

const displayAllBooks = (books) => {
  books.forEach(displayBook)
}

function displayBook(book) {
  const bookLi = document.createElement('li');
  bookLi.textContent = book.title;
  bookLi.setAttribute('book-id', book.id);
  bookList.appendChild(bookLi)
}
