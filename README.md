## Practice Challenge

### What are we looking for
1. Are you able to manipulate the DOM i.e create DOM elements (HTML) and handle events
2. Can you perform async actions i.e Fetch
> Make it work, then make it perfect - Wayne Gretzy - Michael Scott

### Getting Started

You will be using the [json-server](https://github.com/typicode/json-server) package to mock an external API. You can make the same RESTful requests to this server that you would to any API. If you haven't yet, install json-server.
```bash
npm install -g json-server
```

Then run the server with:
```bash
json-server db.json
```

This will serve your code on http://localhost:3000.


#### Build the following application in Vanilla JS

![](example.gif)

You will be using the following backend to get the list of books. The expectation here is that you will include the following features

- Get a list of books & render them
  `http://localhost:3000/books`
- Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.
- You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}]`, you should send as the body of your PATCH request:

```javascript
{
  "users": [
    {"id":2, "username":"auer"},
    {"id":8, "username":"goodwin"},
    {"id":1, "username":"pouros"}
  ]
}
```
- This route will respond with the updated book json including the list of users who have liked the book.
- BONUS: Can you make it so a second patch request to the same book removes your user from the list of users? Can you toggle likes on and off?