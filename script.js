const $bookStore =  () => {

/*
        GET
        DOM 
        ELEMENTS
*/
//Retrieving of the elements DOM
const $modal = document.getElementById("modal-form-add-book");
const $closeModal = $modal.querySelector(".close-modal");
const $addBook = document.getElementById("add-book-btn");
const $titleInput = document.getElementById("title");
const $authorInput = document.getElementById("author");
const $saveBook = document.getElementById("save-book-btn");
const $allBooks = document.getElementById("all-books");


  
  let books = JSON.parse(localStorage.getItem("books")) || [];

/*

FUNCTIONS

*/

//Function toggle modal
const toggleModal = () => {
    $modal.style.display = $modal.style.display === "block" ? "none" : "block";
    
  }

//Function save book
const saveBook = () =>  {
    const title = $titleInput.value.trim();
    const author = $authorInput.value.trim();

    if (title && author) {
      const id = `${Date.now()}`;
      const book = { id, title, author, read: false };
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
      renderBookList();
      toggleModal();
      $titleInput.value = "";
      $authorInput.value = "";
    } else {
      alert("Please complete all fields");
    }
  }
  
  //Function render books list
const renderBookList = ()  => {
    $allBooks.innerHTML = "";
    books.forEach(book => {
      const { id, title, author, read } = book;
      const bookItem = document.createElement("div");
      bookItem.innerHTML = `
        <div class="book" data-id="${id}">
        <p>BookId: ${id}</p>
          <h4 ${read ? 'class="read"' : ''}>Title: ${title}</h4>
          <h4>Author: ${author}</h4>
          <button class="read-btn">${read ? "unread" : "read"}</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      $allBooks.appendChild(bookItem);
    });
  }

  
  // Function to switch the reading state of a book
  function toggleReadStatus(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    books[bookIndex].read = !books[bookIndex].read;
    localStorage.setItem("books", JSON.stringify(books));
    renderBookList();
  }

  // Function to remove a book from the list
  function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    renderBookList();
  }

/*

    EVENT
    LISTNER

*/

//Adding book
$addBook.addEventListener("click", toggleModal);
//Save book
$saveBook.addEventListener("click", saveBook);
// Closing the add book modal
$closeModal.addEventListener("click", toggleModal);

// Managing actions on books in the list
$allBooks.addEventListener("click", e => {
    const target = e.target;
    const bookId = target.closest(".book").dataset.id;
    if (target.classList.contains("read-btn")) {
      // Toggle book reading state
      toggleReadStatus(bookId);
      
      target.textContent = target.textContent === "read" ? "unread" : "read";
      
      const bookTitle = target.closest(".book").querySelector("h4");
      bookTitle.classList.toggle("read");
    } else if (target.classList.contains("delete-btn")) {
      
      deleteBook(bookId);
    }
  });

 // Initial rendering of the book list
  renderBookList();
}



document.addEventListener("DOMContentLoaded", $bookStore)
