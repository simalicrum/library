let myLibrary = [];

function Book(title, author, year, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
  this.index = generateBookIndex();
}

function generateBookIndex() {
  let newIndex = Math.floor(Math.random() * 9999);
  while (myLibrary.some((element) => element.index == newIndex)) {
    newIndex = Math.floor(Math.random() * 9999);
  }
  return newIndex;
}

function addBookToLibrary(title, author, year, pages, read) {
  return new Book(title, author, year, pages, read);
}

Book.prototype.toggleRead = function () {
  switch (this.read) {
    case true:
      this.read = false;
      break;
    case false:
      this.read = true;
      break;
  }
};

function renderBookCard() {}

function showBookTable() {
  let bookTable = document.getElementById("book-table");
  for (book of myLibrary) {
    bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");
    bookCard.setAttribute("data-index", book.index);
    bookTitle = document.createElement("h1");
    bookTitle.innerHTML = book.title;
    bookCard.appendChild(bookTitle);
    bookYear = document.createElement("h2");
    bookYear.innerHTML = book.year;
    bookCard.appendChild(bookYear);
    bookPages = document.createElement("h3");
    bookPages.innerHTML = book.pages;
    bookCard.appendChild(bookPages);
    bookRemoveButton = document.createElement("button");
    bookRemoveButton.setAttribute("data-index", book.index);
    bookRemoveButton.innerHTML = "Remove from Library";
    bookCard.appendChild(bookRemoveButton);
    bookTable.appendChild(bookCard);
    bookCard
      .querySelector(`[data-index="${bookCard.getAttribute("data-index")}"`)
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
  }
}


//document.getElementById("new-book").addEventListener("click", function () {
//  document.getElementById("new-book-form").style.display = "block";
//});

document.getElementById("new-book-add").addEventListener("click", function (e) {
  console.log(e);
  console.log("Why?");
  let newBook = addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("year").value,
    document.getElementById("pages").value,
    true
  );
  myLibrary.push(newBook);
  console.log(myLibrary);
  showBookTable();
});

myLibrary.push(addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "1937", "310", false));
myLibrary.push(addBookToLibrary("Dune", "Frank Herbert", "1965", "412", false));
myLibrary.push(addBookToLibrary("Hyperion", "Dan Simmons", "1989", "482", false));
myLibrary.push(addBookToLibrary("Neuromancer", "William Gibson", "1984", "271", false));

showBookTable();
