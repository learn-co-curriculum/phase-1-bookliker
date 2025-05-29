document.addEventListener("DOMContentLoaded", function () {
  const booksUrl = "http://localhost:3000/books";
  const bookList = document.querySelector("ul#list");
  const bookPanel = document.querySelector("#show-panel");

  fetch(booksUrl)
    .then((response) => response.json())
    .then((books) => books.map((book) => displayBook(book)));

  function displayBook(book) {
    const listItem = document.createElement("li");
    listItem.textContent = book.title;
    bookList.append(listItem);

    listItem.addEventListener("click", () => {
      bookPanel.innerHTML = "";
      showDetails(book);
    });
  }

  function showDetails(book) {
    const bookCover = document.createElement("img");
    const bookTitle = document.createElement("h1");
    const subtitle = document.createElement("h2");
    const author = document.createElement("h3");
    const description = document.createElement("p");
    const usersList = document.createElement("ul");
    const likeButton = document.createElement("button");

    bookCover.src = book.img_url;
    bookTitle.textContent = book.title;
    subtitle.textContent = book.subtitle;
    author.textContent = book.author;
    description.textContent = book.description;
    usersList.id = "users-list";
    likeButton.textContent = "LIKE";

    likeButton.addEventListener("click", () => {
      likeBook(book);
    });

    showUsers(book, usersList);

    bookPanel.append(
      bookCover,
      bookTitle,
      subtitle,
      author,
      description,
      usersList,
      likeButton
    );
  }

  function likeBook(book) {
    const usersList = document.querySelector("#users-list");
    const updatedUsers = [...book.users, { id: 12, username: "testuser" }];

    fetch(`${booksUrl}/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ users: updatedUsers }),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        book.users = updatedBook.users;
        showUsers(updatedBook, usersList);
      });
  }

  function showUsers(book, parentElement) {
    parentElement.innerHTML = "";

    for (const user of book.users) {
      const username = document.createElement("li");
      username.textContent = user.username;
      parentElement.append(username);
    }
  }
});
