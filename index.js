document.addEventListener("DOMContentLoaded", function(){
	const USER_ID = 2

	function getBooks(){
		let listPanel = document.getElementById('list')

		fetch('https://flatiron-bookstore-challenge.herokuapp.com/books')
		.then(res => res.json())
		.then(books => {
			books.forEach(book => {
				let newBook = new Book(book)

				listPanel.append(renderBook(book))
			})

			listPanel.addEventListener("click", function(event){
				let foundBook = Book.getAll().find(book => book.id == event.target.dataset.id)
				let showPanel = document.getElementById("show-panel")

				showPanel.innerHTML = ""
				showPanel.append(showBookDetails(foundBook))
			})
			
		})

	}

	function renderBook(book){
		let bookLi = document.createElement('li')
		let bookDiv = document.createElement('div')
		bookDiv.textContent = book.title
		bookDiv.dataset.id = book.id

		bookLi.append(bookDiv)
		return bookLi

	}

	function showBookDetails(book){
		let detailsDiv = document.createElement("div")
		detailsDiv.innerHTML = `
			<h3>${book.title}</h3>
			<img src="${book.img_url}"/>
			<p>${book.description}</p>
		`


		let usersDiv = document.createElement("div")
		usersDiv.id = "users"

		book.users.forEach(user => {
			usersDiv.innerHTML += `
				<h5>${user.username}</h5>
			`
		})

		detailsDiv.append(usersDiv)


		let saveBookButton = document.createElement("button")
		saveBookButton.innerText = "Read Book"
		saveBookButton.addEventListener("click", function(event){
			readBook(book.id)
			.then(updatedBook => {
				if (book.users.length !== updatedBook.users.length) {
					let user = updatedBook.users[updatedBook.users.length-1]
					usersDiv.innerHTML += `
						<h5>${user.username}</h5>
					`
					book.users.push(user)
				} else {
					alert('You read this already!')
				}
			})
		})

		detailsDiv.append(saveBookButton)

		return detailsDiv
	}

	function readBook(bookId){
		return fetch(`https://flatiron-bookstore-challenge.herokuapp.com/books/${bookId}`, {
			method: "PATCH",
			headers: {
				'Content-Type': "application/json",
				'Accept': "application/json"
			},
			body: JSON.stringify({
				user_id: USER_ID
			})
		}).then(res => res.json())
	}

	getBooks()

})

// Title, descripotion, image_url