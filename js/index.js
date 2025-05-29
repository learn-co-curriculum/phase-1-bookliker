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
  await buildBook(this.getAttribute('book-id'))
}

async function buildBook(fetchBookId) {
  const book = await fetchBookById(fetchBookId)
  showPanel.innerHTML = ''
  createAndAppendImg(book);
  createAndAppendText('h1', book.title);
  createAndAppendText('h3', book.subtitle);
  createAndAppendText('h3', book.author);
  createAndAppendText('p', book.description);
  createAndAppendLikeButton(book.id)
  createAndAppendLike(book.users)
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

async function createAndAppendLikeButton(bookId) {
  const likeButton = document.createElement('button')
  likeButton.textContent = await setLikeStatus(bookId)
  likeButton.setAttribute('book-id', bookId)
  likeButton.addEventListener('click', likeBook)
  showPanel.appendChild(likeButton)
}

async function setLikeStatus(bookId) {
  return await doesUserLikeBook(bookId) ? 'UNLIKE' : 'LIKE'
}

async function doesUserLikeBook(bookId) {
  const book = await fetchBookById(bookId);
  return !!book.users.find(user => user.id === currentUser.id)
}

async function likeBook() {
  const bookId = this.getAttribute('book-id')
  const book = await fetchBookById(bookId);
  if (this.textContent === 'UNLIKE') {
    book.users = book.users.filter(user => user.id !== currentUser.id)
  } else {
    book.users.push(currentUser)
  }
  await updateBookUsers(book)
  buildBook(bookId)
}

const updateBookUsers = async (book) => {
  const options = {
    body: JSON.stringify({ users: book.users }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  await fetch(`${url}/${book.id}`, options)
}
