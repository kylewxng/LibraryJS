const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Add a book to library

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Display the books function

function displayBooks() {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `<div class="card-content">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button id="toggleRead-${i}" type="button">Toggle Read</button>
            <button id="deleteBook-${i}" type="submit">Delete Book</button>
        </div>`;

        booksContainer.appendChild(bookCard);

        const toggleReadButton = document.getElementById(`toggleRead-${i}`);
        toggleReadButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks(); 
        });

        const deleteButton = document.getElementById(`deleteBook-${i}`);
        deleteButton.addEventListener('click', () => deleteBook(i));
    }
}   

// Delete book function

function deleteBook(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1); 
        displayBooks(); 
    } else{
        console.error("Invalid index for deleteBook function.");
    }

}

// Create new book modal

const modal = document.getElementById("newBookModal");
const btn = document.getElementById("newBookBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("newBookForm");

btn.onclick = function () {
    modal.style.display = "flex";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    modal.style.display = "none";
    form.reset(); 
});


