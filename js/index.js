//! dev_ant 9/16

//* necessary elements from HTML
const list = document.getElementById("list");
const users = document.getElementById("users");
const showPanel = document.getElementById("show-panel");

const createBookList = (bookArr) => {
  bookArr.forEach(({ id, title }) => {
    const li = document.createElement("li");
    li.setAttribute("id", `book-list-${id}`);
    li.textContent = title;
    li.addEventListener("click", () => getOneBook(id));
    list.appendChild(li);
  });
};

const createUserList = (userArr, _id = null) => {
  userArr.forEach(({ id, username }) => {
    const li = document.createElement("li");
    li.textContent = username;
    if (_id) {
      li.setAttribute("id", `user-like-${id}`);
      document.querySelector(`#book-card-${_id} > ul`).appendChild(li);
    } else {
      li.setAttribute("id", `user-list-${id}`);
      list.appendChild(li);
    }
  });
};

const addLike = (_id) => {
  console.log(_id);
};

const displayOneBook = ({
  id,
  title,
  subtitle,
  description,
  author,
  img_url,
  users,
}) => {
  showPanel.innerHTML = "";
  const div = document.createElement("div");
  div.setAttribute("id", `book-card-${id}`);
  const img = document.createElement("img");
  img.setAttribute("src", img_url);
  img.setAttribute("alt", `${title} Cover Image`);
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const h3 = document.createElement("h3");
  if (subtitle) h3.textContent = subtitle;
  const h4 = document.createElement("h4");
  h4.textContent = author;
  const p = document.createElement("p");
  p.textContent = description;
  const ul = document.createElement("ul");
  const btn = document.createElement("button");
  btn.textContent = "Like";
  btn.addEventListener("click", () => addLike(id));
  div.append(img, h2, h3, h4, p, ul, btn);
  showPanel.appendChild(div);

  createUserList(users, id); //* adds li to user likes ul
};

const updateBookInfo = () => {};

const patchBookData = () => {};

const getAllBooks = () => {
  fetch("http://localhost:3000/books")
    .then((resp) => resp.json())
    .then((books) => createBookList(books))
    .catch((err) => console.log("Error: ", err.message));
};

const getOneBook = (_id) => {
  fetch(`http://localhost:3000/books/${_id}`)
    .then((resp) => resp.json())
    .then((book) => displayOneBook(book))
    .catch((err) => console.log("Error: ", err.message));
};

const getUserData = () => {
  fetch("http://localhost:3000/users")
    .then((resp) => resp.json())
    .then((data) => createUserList(data))
    .catch((err) => console.log("Error: ", err.message));
};

//* my thought is to have one main function initialize the logic,
//* so I used the origional event listener
// ? (look into best practice options)
document.addEventListener("DOMContentLoaded", () => {
  getAllBooks();
  getUserData();
});
