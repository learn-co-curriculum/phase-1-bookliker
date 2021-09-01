# Additional Practice: BookLiker

## Learning Goals

- Access information from an API using a GET request and use it to update the
  DOM
- Listen for user events and update the DOM in response
- Send data to an API using a PATCH request

## Introduction

Welcome to BookLiker, where you can look at books and like them! (Hey, not all
startups are brilliant ideas.)

## Getting Started

You will be using the [json-server][] package to mock an external API. You can
make the same RESTful requests to this server that you would to any API. If you
haven't yet, install json-server.

```console
$ npm install -g json-server
```

Then run the server with:

```console
$ json-server db.json
```

This will serve your code on `http://localhost:3000`.

[json-server]: https://github.com/typicode/json-server

## Deliverables

![example GIF](http://curriculum-content.s3.amazonaws.com/module-3/bookliker-example.gif)

You will be using the following backend to get the list of books. The
expectation here is that you will include the following features:

### List Books

When the page loads, get a list of books from `http://localhost:3000/books` and
display their titles by creating a `li` for each book and adding each `li` to
the `ul#list` element.

### Show Details

When a user clicks the title of a book, display the book's thumbnail, description,
and a list of users who have liked the book. This information should be displayed in
the `div#show-panel` element.

### Like a Book

A user can like a book by clicking on a button. Display a `LIKE` button along
with the book details. When the button is clicked, send a `PATCH` request to
`http://localhost:3000/books/:id` with an array of users who like the book,
and add a new user to the list.

For example, if you are user 1 `{"id":1, "username":"pouros"}` and the previous
array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"maverick"}]`, you
should send as the body of your PATCH request:

```json
{
  "users": [
    { "id": 2, "username": "auer" },
    { "id": 8, "username": "maverick" },
    { "id": 1, "username": "pouros" }
  ]
}
```

After clicking the like button, the user's name should also be displayed along
with the list of users who have liked the book in the book details section.

### Bonus: Un-Like a Book

If a user has already liked a book, clicking the LIKE button a second time
should remove that user from the list of users who have liked the book.

Make a second PATCH request with the updated array of users, removing your user
from the list. Also remove the user from the DOM.
