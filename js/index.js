const url = 'http://localhost:3000/books'
const bookList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
const currentUser = { id: 25, username: 'Stove' }

document.addEventListener("DOMContentLoaded", function () {
  fetchAndListAllBooks()
});

const fetchAndListAllBooks = () => {
  fetch(url).then(r => r.json()).then(listAllBooks)
}

const fetchBookById = async (bookId) => {
  const r = await fetch(`${url}/${bookId}`);
  const data = await r.json();
  return data;
}

const listAllBooks = (books) => {
  books.forEach(listBook)
}

function listBook(book) {
  const bookLi = document.createElement('li');
  bookLi.textContent = book.title;
  bookLi.setAttribute('book-id', book.id);
  bookLi.addEventListener('click', showBook)
  bookList.appendChild(bookLi)
}

async function showBook() {
  const book = await fetchBookById(this.getAttribute('book-id'))
  showPanel.innerHTML = ''
  createAndAppendImg(book);
  createAndAppendText('h1', book.title);
  createAndAppendText('h3', book.subtitle);
  createAndAppendText('h3', book.author);
  createAndAppendText('p', book.description);
  createAndAppendLike(book.users)
  createAndAppendLikeButton(book.id)
}

function createAndAppendImg(book) {
  const coverImage = document.createElement('img');
  coverImage.src = book.img_url
  showPanel.appendChild(coverImage)
}

function createAndAppendText(elementType, valueToDisplay) {
  const newEl = document.createElement(elementType);
  newEl.textContent = valueToDisplay
  showPanel.appendChild(newEl)
}

function createAndAppendLike(users) {
  const likeUl = document.createElement('ul')
  users.forEach(user => {
    const likeLi = document.createElement('li')
    likeLi.textContent = user.username;
    likeUl.appendChild(likeLi)
  })
  showPanel.appendChild(likeUl)
}

function createAndAppendLikeButton(bookId) {
  const likeButton = document.createElement('button')
  likeButton.textContent = 'LIKE'
  likeButton.setAttribute('book-id', bookId)
  likeButton.addEventListener('click', likeBook)
  showPanel.appendChild(likeButton)
}

const likeBook = () => {

}
