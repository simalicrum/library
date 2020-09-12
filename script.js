let myLibrary = [];

class Book {
  constructor(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    this.index = generateBookIndex();
  }
  toggleRead() {
    switch (this.read) {
      case "Yes":
        this.read = "No";
        break;
      case "No":
        this.read = "Yes";
        break;
    }
  }
}

function generateBookIndex() {
  let newIndex = Math.floor(Math.random() * 9999);
  while (myLibrary.some((element) => element.index == newIndex)) {
    newIndex = Math.floor(Math.random() * 9999);
  }
  return newIndex;
}

function addBookToLibrary(title, author, year, pages, read) {
  myLibrary.push(new Book(title, author, year, pages, read));
}



function renderBookCard(book) {
  let bookTable = document.getElementById("book-table");
  bookCard = document.createElement("div");
  bookCard.setAttribute("class", "book-card");
  bookCard.setAttribute("data-index", book.index);
  bookTitle = document.createElement("h1");
  bookTitle.innerHTML = book.title;
  bookCard.appendChild(bookTitle);
  bookYear = document.createElement("h2");
  bookYear.innerHTML = book.author + ", " + book.year;
  bookCard.appendChild(bookYear);
  bookPages = document.createElement("h3");
  bookPages.innerHTML = "Page count: " + book.pages;
  bookCard.appendChild(bookPages);
  bookRead = document.createElement("h3");
  bookRead.innerHTML = "Book read? " + book.read;
  bookRead.setAttribute("class", "read-book-text");
  bookCard.appendChild(bookRead);
  bookRemoveButton = document.createElement("button");
  bookRemoveButton.setAttribute("data-index", book.index);
  bookRemoveButton.setAttribute("class", "remove-button");
  bookRemoveButton.innerHTML = "Remove from Library";
  bookCard.appendChild(bookRemoveButton);
  bookToogleReadButton = document.createElement("button");
  bookToogleReadButton.setAttribute("data-index", book.index);
  bookToogleReadButton.setAttribute("class", "read-book");
  bookToogleReadButton.innerHTML = "Toggle Read";
  bookCard.appendChild(bookToogleReadButton);
  bookTable.appendChild(bookCard);
  bookCard
    .querySelector(".remove-button")
    .addEventListener("click", function (e) {
      for (i of myLibrary) {
        if (i.index == e.srcElement.dataset.index) {
          myLibrary.splice(myLibrary.indexOf(i), 1);
          document
            .getElementById("book-table")
            .removeChild(
              document.querySelector(
                `[data-index="${e.srcElement.dataset.index}"`
              )
            );
        }
      }
    });
  bookCard.querySelector(".read-book").addEventListener("click", function (e) {
    for (i of myLibrary) {
      if (i.index == e.srcElement.dataset.index) {
        i.toggleRead();
        document
          .querySelector(`[data-index="${e.srcElement.dataset.index}"`)
          .querySelector(".read-book-text").innerHTML = "Book read? " + i.read;
      }
    }
  });
}

function showBookTable() {
  for (book of myLibrary) {
    renderBookCard(book);
  }
}

document.getElementById("new-book").addEventListener("click", function () {
  document.getElementById("new-book-form").style.display = "block";
});

document.getElementById("new-book-add").addEventListener("click", function (e) {
  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("year").value,
    document.getElementById("pages").value,
    "No"
  );
  renderBookCard(myLibrary[myLibrary.length - 1]);
  document.getElementById("new-book-form").style.display = "none";
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "1937", "310", "No");
addBookToLibrary("Dune", "Frank Herbert", "1965", "412", "No");
addBookToLibrary("Hyperion", "Dan Simmons", "1989", "482", "No");
addBookToLibrary("Neuromancer", "William Gibson", "1984", "271", "No");

showBookTable();
