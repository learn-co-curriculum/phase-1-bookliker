// Base URL for fetch calls
const BASE_URL = "http://localhost:3000";

// Arbitrary user object to represent the user who can like and unlike books
const CURRENT_USER = { id: 19, username: "Phase 1 Student" };

/* Stateful variable which stores the book on display. Storing the current 
 * book gives access to the commenter's id's, which are required for 
 * the PATCH request
 */
let currentBook = {};

// Setter function to update state of currentBook
const setCurrentBook = book => {
    currentBook = book;
};


/* On page load, this function fetches all books from the json-server
 * and calls a function to display a title for each book
 */
const getBooks = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(json => displayTitlesForBooks(json))
};


/* Loops through each book in 'books' and renders their titles to the 
 * DOM. 
 */
const displayTitlesForBooks = books => {
    const list = document.getElementById('list');
    books.forEach(book => {
        // Add the first book's details to the DOM on page load
        if (parseInt(book.id) === 1)
            renderBook(book);
        const item = document.createElement('li');
        item.textContent = book.title;
        addListenerToTitle(item, book);
        list.appendChild(item); 
    });
};

/* renderBook() takes a book object as an argument, which it uses to 
 * add the book's details to the DOM.
 */
const renderBook = book => {

    // Set state variable whenever a new book is added to the DOM
    setCurrentBook(book);

    // Create book DOM elements, and append them to showPanel
    const showPanel = document.getElementById('show-panel');
    showPanel.textContent = "";

    const image = document.createElement('img');
    image.src = book.img_url;

    const p = document.createElement('p');
    p.textContent = book.description;

    const unorderedList = document.createElement('ul');
    // Given an id to be easily retrieved by updateUserLikeList()
    unorderedList.id = "like-list";
    
    book.users.forEach(user => {
        const item = document.createElement('li');
        item.textContent = user.username;
        unorderedList.append(item);
    });

    const likeBtn = document.createElement('button');
    likeBtn.textContent = "Like";
    addListenerToLikeButton(likeBtn);

    showPanel.append(image, p, unorderedList, likeBtn);
};

/* This function is called by displayTitleForBooks(). It's responsible for
 * adding a click event to each book title list item, which will 
 * render that respective book's details on click.
 */
const addListenerToTitle = (listItem, book) => {
    listItem.addEventListener('click', () => {
        renderBook(book);
    })
}

/* Similar to addListenerToTitle(), this function is called by renderBook(), 
 * which attaches the click event to each book's like button when the book's
 * details are rendered
 */
const addListenerToLikeButton = btn => {
    btn.addEventListener('click', () => {
        likeBookAndUpdateUsers();
    });
};

/* This function is called whenever a book's like button is clicked.
 * It first determines whether the current user (Phase 1 Student) is in 
 * the list of users who like the current book. If the current user likes
 * the book, a PATCH request is sent and the user is removed from the
 * current book's like list. Otherwise, the user is added to the current
 * books like list with a PATCH request. The DOM is updated to reflect the
 * server's response.
 */
const likeBookAndUpdateUsers = () => {
    const alreadyLiked = currentBook.users.find(user => {
        return parseInt(user.id, 10) === CURRENT_USER.id;
    });

    // PATCH request body
    let users = {};

    // Determines if the current user should belong in the book's like list, based on currentBook
    if (alreadyLiked)
        users = currentBook.users.filter(user => user.id !== CURRENT_USER.id);
    else 
        users = [...currentBook.users, CURRENT_USER];

    config = {
        method: "PATCH",
        headers: {
            "Content-Type": "Application/json"
        },
        // Shorthand for { users: users }
        body: JSON.stringify({ users })
    };

    fetch(BASE_URL + `/books/${currentBook.id}`, config)
    .then(res => res.json())
    .then(json => updateUserLikeList(json))
};


const updateUserLikeList = book => {

    // Update state from server
    currentBook = book;
    
    // Get user like list from the DOM
    const userList = document.getElementById("like-list");
    
    // Clear like list
    userList.textContent = null;

    currentBook.users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.username;
        userList.append(li);
    });

};

// Entry point to program defined here, and then invoked on 161
const init = () => {
    getBooks();
};

init();
