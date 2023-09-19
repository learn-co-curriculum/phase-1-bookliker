const booksUrl = "http://localhost:3000/books";
const usersUrl = "http://localhost:3000/users";
const listPanel = document.querySelector("#list-panel");
const list = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");

const createBooksList = (booksArr) => {
  booksArr.forEach(({ id, title }) => {
    const li = document.createElement("li");
    li.id = `book-list-${id}`;
    li.textContent = title;
    li.addEventListener("click", () => getOneBookData(id));
    list.appendChild(li);
  });
};

const createUserSelectElement = (usersArr) => {
  const select = document.createElement("select");
  const option = document.createElement("option");
  select.name = "users";
  select.id = "users";
  option.value = null;
  option.textContent = "Select a User";
  select.append(option);
  usersArr.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.username;
    select.append(option);
  });
  listPanel.append(select);
};

const createUsersList = (_id, usersArr) => {
  const bookLikes = document.querySelector(`#book-${_id}-likes`);
  usersArr.forEach(({ username }) => {
    const li = document.createElement("li");
    li.textContent = username;
    bookLikes.append(li);
  });
};

const createBookCard = (bookObj) => {
  const { id, title, subtitle, description, author, img_url, users } = bookObj;
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
  ul.id = `book-${id}-likes`;

  const btn = document.createElement("button");
  btn.textContent = "Like";
  // btn.addEventListener("click", () => addLike(id));

  div.append(img, h2, h3, h4, p, ul, btn);
  showPanel.appendChild(div);

  createUsersList(id, users);
};

const getAllUsersData = () => {
  getData(usersUrl)
    .then((users) => createUserSelectElement(users))
    .catch((err) => console.log("Error: ", err.message));
};

const getAllBooksData = () => {
  getData(booksUrl)
    .then((books) => createBooksList(books))
    .catch((err) => console.log("Error: ", err.message));
};

const getOneBookData = (_id) => {
  getData(`${booksUrl}/${_id}`)
    .then((book) => createBookCard(book))
    .catch((err) => console.log("Error: ", err.message));
};

const initialize = () => {
  getAllBooksData();
  getAllUsersData();
};

initialize();
