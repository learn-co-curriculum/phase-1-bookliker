const list = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const detailImg = document.createElement("img")
const detailTitle = document.createElement("h3")
const detailSub = document.createElement("h3")
const detailAuthor = document.createElement("h3")
const detailDescription = document.createElement("p")
const userList = document.createElement("ul")
showPanel.append(detailImg, detailTitle, detailSub, detailAuthor, detailDescription, userList)
///////////////////////////////////////////////////////////

fetch("http://localhost:3000/books")
.then(response => response.json())
.then(data => data.forEach(data => {
    renderBook(data)
    }
    )
    )

function renderBook(book){
const li = document.createElement("li")
list.append(li)
li.innerText = book.title
display(li, book)
}

function display(li, book){
li.addEventListener("click", ()=>{
detailImg.src = book.img_url 
detailTitle.innerText = book.title
detailSub.innerText = book.subtitle
detailAuthor.innerText = book.author
detailDescription.innerText = book.description
displayUsers(book)
console.log(userList.childNodes)
})
}

function displayUsers(book){
while(userList.childNodes.length !== 0){
userList.removeChild(userList.lastChild)
}
book.users.forEach(user => {
const li = document.createElement("li")
userList.append(li)
li.innerText = user.username
})
}




