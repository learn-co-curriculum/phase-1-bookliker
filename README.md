## Objectives 

#### Build the following application in Vanilla JS 

![](example.gif)

You will be using the following backend to get the list of books. The expectation here is that you will include the following features

- Get a list of books & render them 
  `https://flatiron-bookstore-challenge.herokuapp.com/books`
- Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book
- Be able to checkout a book by clicking on a button
	To checkout a book a `PATCH` must be sent to `https://flatiron-bookstore-challenge.herokuapp.com/books/:id` with the following example JSON string `{ "user_id": 1 }`
  This route will respond with the updated book json including the list of users who have checked out the book 
      
      
__You can find a user_id to use by looking at the following route. `https://flatiron-bookstore-challenge.herokuapp.com/users`. Pick a random user to use but be advised there is some chance of someone else using the same id__


### Things to note 

1. Do not use the Module pattern 
2. Test your program frequently 
3. Get it working before you even think of refactoring 