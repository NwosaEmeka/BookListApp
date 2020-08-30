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
		this.showMessage('You book has been added successfully', 'green');
	}
	deleteBookFromUi(bookToDelete) {
		if (confirm('Do you want to delete this book? ')) {
			bookToDelete.remove();
			this.showMessage('Book removed successfully', 'green');
		}
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

ui = new UI(); //create a new instance of UI

form.addEventListener('submit', (e) => {
	let title_value = title.value.trim(),
		author_value = author.value.trim(),
		isbn_value = isbn.value.trim();

	if (title_value === '' || author_value === '' || isbn_value === '') {
		ui.showMessage('Please fill the complete information', 'red');
	} else {
		book = new Book(title_value, author_value, isbn_value);
		ui.addBookToUi(book);
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
		ui.deleteBookFromUi(element);
	}
});
