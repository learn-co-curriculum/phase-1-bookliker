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

    bookCover.src = book.img_url;
    bookTitle.textContent = book.title;
    subtitle.textContent = book.subtitle;
    author.textContent = book.author;
    description.textContent = book.description;

    for (const user of book.users) {
      const username = document.createElement("li");
      username.textContent = user.username;
      usersList.append(username);
    }

    bookPanel.append(
      bookCover,
      bookTitle,
      subtitle,
      author,
      description,
      usersList
    );
  }
});
