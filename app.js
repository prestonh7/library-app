let myLibrary = [];

const addBookBtn = document.querySelector(".addBookBtn");
const content = document.querySelector(".content");
const popup = document.querySelector('#popup');

//Display form
addBookBtn.addEventListener("click", () => {
  popup.classList.toggle('open');
});

//Take form values and creates book
const form = document.querySelector('#addBookForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.querySelector('#title').value;
  const author = form.querySelector('#author').value;
  const pages = form.querySelector('#pages').value;
  const read = form.querySelector('#read').checked;
  const book = new Book(title, author, pages, read);
  book.addBookToLibrary();
  form.reset();
  popup.classList.toggle('open');
});

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addBookToLibrary() {
      myLibrary.push(this);
      updateList();
    }

    removeBook(book) {
      myLibrary.splice(book);
      updateList();
    }
}

function updateList() {
    const container = document.querySelector(".container");
    container.innerText = ""; // clear the current list
  
    myLibrary.forEach((book, index) => {
      const li = document.createElement("li");
      const title = document.createElement("h3");
      const author = document.createElement("p");
      const pages = document.createElement("p");
      const readText = document.createElement("span");
      const read = document.createElement("input");
      read.setAttribute("type", "checkbox");
      const remove = document.createElement("button");
  
      // set the text content of the elements
      title.textContent = book.title;
      author.textContent = book.author;
      pages.textContent = book.pages;
      readText.textContent = "Read: "
      read.checked = book.read;
      remove.textContent = "X";
  
      // add event listeners to the buttons
      read.addEventListener("click", () => {
        book.read = read.checked;
      });
      remove.addEventListener("click", () => {
        myLibrary[index].removeBook(index);
      });
  
      // append the elements to the li element
      li.appendChild(title);
      li.appendChild(author);
      li.appendChild(pages);
      li.appendChild(readText);
      li.appendChild(read);
      li.appendChild(remove);
  
      // append the li element to the ul element
      container.appendChild(li);
    });
}

let berserk = new Book("Berserk", "Kentaro Miura", "~700", true);

let naruto = new Book("Naruto", "Masashi Kishimoto", "192", false);

berserk.addBookToLibrary();
naruto.addBookToLibrary();

updateList();