// First, tell the script to wait until all DOM Content is loaded before running
// the listBooks function. This works similarly to the defer attribute.
document.addEventListener("DOMContentLoaded", listBooks);

// Then, build a function that fetches the books and renders their titles.
// In a forEach iterator, pass in each book object as an argument to a 
// callback function that renders the book title to the list of titles.
function listBooks() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => books.forEach(book => renderBookTitle(book)))
    // ^ Here, we're calling renderBookTitle as a callback for each book object in the books array.
}

// Next, build the function that constructs the list of titles from each book.
// Then make each title clickable.
function renderBookTitle(book) {
    const bookList = document.getElementById("list")
    const titleItem = document.createElement("li")
    titleItem.textContent = book.title
    bookList.append(titleItem)

    // This click event listener below takes a callback that shows the book 
    // details in the "#show-panel" div. 
    //
    // Remember, we called renderBookTitle in the forEach on line 11, so this event
    // listener is being added to every titleItem uniquely.
    //
    // We pass in the book  as an argument so that each titleItem has access to all of 
    // the information for the corresponding book (title, subtitle, etc.).
    titleItem.addEventListener("click", () => showBookDetail(book))
}

// Next, build the function that renders a book's details to the "#show-panel" div each time
// the corresponding title is clicked.
function showBookDetail(book) {
    console.log(`after patch: ${book.title}`)
    // Grab and create the relevant elements:
    const showPanel = document.getElementById("show-panel")
    const title = document.createElement("h1")
    const subtitle = document.createElement("h2")
    const author = document.createElement("h2")
    const description = document.createElement("p")
    const thumbnail = document.createElement("img")
    const users = document.createElement("ul")
    const likeButton = document.createElement("button")

    // Populate those elements with data from the passed-in book object.
    // On the right side of the equals sign, we use dot notation to access 
    // the values inside the book object
    title.textContent = book.title
    subtitle.textContent = book.subtitle
    author.textContent = `By ${book.author}`
    description.textContent = book.description
    thumbnail.src = book.img_url
    likeButton.textContent = "Like"

    // To populate the user list for the clicked book, we must iterate through
    // the users array:
    book.users.forEach(user => {
        const userListItem = document.createElement("li")
        userListItem.textContent = user.username
        users.append(userListItem)
    })

    // If the "#show-panel" div is already populated, remove its children so that
    // the selected books don't just keep adding on to the panel (since our functionality
    // is meant to show just one selected book at a time).
    while(showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild)
    }

    // Add event listener to likeButton:
    // Remember to pass in book (that is, the data object for the currently displayed book)
    likeButton.addEventListener("click", () => submitLike(book))

    // Finally, we append the populated elements to the "#show-panel" div
    showPanel.append(title, subtitle, author, description, thumbnail, users, likeButton)
}

// Next, go back into your showBookDetail function and build a like button.
// We want to build the like button inside showBookDetail because that is
// the function that renders the detail section each time a book title is clicked.
// Any like button we define in there will be unique to that book, which is good
// because we want to keep track of each book's likes independently.

// Then, define the like button callback. We want it to do two things:
// 1. Send a patch request to the back end adding the user who likes the book
// 2. Update the book display on the front end so we don't need to refresh to 
// see the changes
function submitLike(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            // We use the spread operator (...) here to take the contents of 
            // an array—in this case, book.users—and copy it into a new array,
            // where we then add the new user on the end.
            "users": [...book.users, { "id": 1, "username": "pouros"} ]            
        })
    })
    // You don't always need to access the response of a PATCH request (or POST/DELETE, 
    // for that matter), but in this case we want the response. The response is the 
    // whole patched object. We want access to that object to be able to re-render the 
    // book's details with the new information included.
    .then(res => res.json())
    .then(book => showBookDetail(book))
    // ^ And this is the beauty of making your functions reusable; we can just call the 
    // showBookDetail function one more time to update the display. No new code needed.
}