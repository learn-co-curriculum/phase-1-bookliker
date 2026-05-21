const bookURL = "http://localhost:3000/books/"
const userURL = "http://localhost:3000/users/"
const el = (tag) => document.createElement(tag)

document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("list")
  fetch(bookURL)
    .then((res) => res.json())
    .then((books) => {
      const bookList = []
      for (const book of books) {
        let bookLi = el("li")
        bookLi.textContent = book.title
        bookLi.setAttribute("id", "bookli" + book.id)
        bookLi.addEventListener("click", (e) => {
          getBook(e.target.id.slice(6))
        })

        bookList.push(bookLi)
      }

      list.append(...bookList)
    })
})

function getBook(bookId) {
  let displayDiv = document.getElementById("show-panel")

  fetch(bookURL + bookId)
    .then((res) => res.json())
    .then((book) => {
      console.log(book)
      let bookImg = el("img")
      let bookTitle = el("h2")
      let bookSubtitle = el("h3")
      let bookAuthor = el("h3")
      let bookDesc = el("p")
      let bookUsers = el("ul")
      let likeBtn = el("button")

      for (const user of book.users) {
        let userLi = el("li")
        userLi.textContent = user.username

        bookUsers.append(userLi)
      }

      bookImg.setAttribute("src", book.img_url)
      bookTitle.textContent = book.title
      bookSubtitle.textContent = book.subtitle
      bookAuthor.textContent = book.author
      bookDesc.textContent = book.description
      if (book.users.some((user) => user.id === 6)) {
        likeBtn.textContent = "UNLIKE"
        likeBtn.setAttribute("data-liked", "true")
        likeBtn.addEventListener('click', e => toggleBookLike(bookId, book.users, e.target))
      } else {
        likeBtn.textContent = "LIKE"
        likeBtn.setAttribute("data-liked", "false")
        likeBtn.addEventListener('click', e => toggleBookLike(bookId, book.users, e.target))
      }

      displayDiv.replaceChildren(
        bookImg,
        bookTitle,
        bookSubtitle,
        bookAuthor,
        bookDesc,
        bookUsers,
        likeBtn,
      )
    })
}

function toggleBookLike(bookId, userList, likeBtn) {
  if (likeBtn.getAttribute("data-liked") == "true") {
    fetch(userURL + 6)
      .then((res) => res.json())
      .then((user) => {
        userList.splice(userList.findIndex(users => users.id === user.id), 1)
        fetch(bookURL + bookId, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            users: userList
          })
        })
        .then(res=>res.json())
        .then(() => getBook(bookId))
      })
  } else {
    fetch(userURL + 6)
      .then((res) => res.json())
      .then((user) => {
        userList.push(user)
        fetch(bookURL + bookId, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            users: userList
          })
        })
        .then(res=>res.json())
        .then(() => getBook(bookId))
      })
  }
}