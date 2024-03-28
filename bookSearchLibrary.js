import { LightningElement,track } from 'lwc';
import searchBooks from'@salesforce/apex/BookSearchController.searchBooks';

export default class BookSearchLibrary extends LightningElement {

    @track bookName;
    @track bookResults=[];
    @track error;


    onChangeHandler(event){
        this.bookName = event.target.value;
    }

 handleSearch() {
     if (!this.bookName.trim()) {
            this.error = 'Please enter a book name';
            return;
        }
        searchBooks({ searchBookName: this.bookName })
        .then(result => {
            // Map author_name to authorNames
            this.bookResults = result.map(book => ({
                key: book.key, // Ensure you have a unique key for each book
                title: book.title,
                authorNames: book.author_name, // Add the author names to the book object
                bookLink: book.bookLink 
            }));
            this.error = undefined; // Clear any previous errors
        })
            .catch(error => {
                this.error = error.body.message || 'An error occurred while fetching data';
                this.bookResults = []; // Clear results in case of error
            });
    }
    
}
