let form = document.querySelector('.form__group');
let tbody = document.querySelector('.table__body');
let error_msg = document.querySelector('.error__message');

const title = document.querySelector('#book'),
	author = document.querySelector('#author'),
	isbn = document.querySelector('#isbn');

// Create book class
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// local storage class
class LS {
	static getBooks() {
		//pull the books from the local storage
		let books = JSON.parse(localStorage.getItem('books')) || [];
		return books;
	}
	static displayBooks() {
		// display the books from the local storage as soon the dom loaded
		let books = LS.getBooks();
		books.forEach((book) => {
			ui.addBookToUi(book);
		});
	}
	static addBooksToLS(book) {
		//pull books from the LS, push the new book and reset the LS
		let books = LS.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}
	static deleteBookFromLS(isbnToRemove) {
		let books = LS.getBooks();

		books.forEach((book, index) => {
			if (book.isbn === isbnToRemove) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

// User interface class
class UI {
	addBookToUi(book) {
		const tablerow = document.createElement('tr');
		tablerow.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#"><i class="fas fa-trash delete__btn"></i></a></td>
			`;
		tbody.appendChild(tablerow);
	}
	deleteBookFromUi(bookToDelete) {
		bookToDelete.remove();
	}
	showMessage(msg, color) {
		error_msg.textContent = msg;
		error_msg.style.color = color;
		error_msg.style.display = 'block';

		setTimeout(() => {
			error_msg.style.display = 'none';
		}, 2000);
	}
	clearText() {
		title.value = '';
		author.value = '';
		isbn.value = '';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	LS.displayBooks();
	//pull books from LS as soon as the document loaded and display
});

const ui = new UI(); //create a new instance of UI
form.addEventListener('submit', (e) => {
	let title_value = title.value.trim(),
		author_value = author.value.trim(),
		isbn_value = isbn.value.trim();

	if (title_value === '' || author_value === '' || isbn_value === '') {
		ui.showMessage('Please fill the complete information', 'red');
	} else {
		const book = new Book(title_value, author_value, isbn_value);
		ui.addBookToUi(book);
		LS.addBooksToLS(book); //because it is static method, no need to instantiate
		ui.showMessage('You book has been added successfully', 'green');
		ui.clearText();
	}
	e.preventDefault();
});

// use event delegation to delete books from the ui because the delete button is added after the document loaded
//if we click on anywhere on the tbody and  and it contains the delete button, then that is the element we want to delete.

tbody.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete__btn')) {
		//go from i tag to a tag to td then to tr and delete the tr;
		let element = e.target.parentElement.parentElement.parentElement;
		if (confirm('Do you want to delete this book? ')) {
			ui.deleteBookFromUi(element);
			// to remove book from local storage, we target the td isbn number since they will be unique which is i to a to td and td previouselementsibling
			let content = e.target.parentElement.parentElement.previousElementSibling.textContent;
			LS.deleteBookFromLS(content);
			ui.showMessage('Book removed successfully', 'green');
		}
	}
});
