document.addEventListener("DOMContentLoaded", function () {
  const booksUrl = "http://localhost:3000/books";
  const bookList = document.querySelector("ul#list");

  fetch(booksUrl)
    .then((response) => response.json())
    .then((books) => books.map((book) => displayBook(book)));

  function displayBook(book) {
    const listItem = document.createElement("li");
    listItem.textContent = book.title;
    bookList.append(listItem);
  }
});
