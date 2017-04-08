This is a book store app named "THE BOOK GARAGE"
The functionality of this app is as following:

let url = window.location.href;-------- this the first line of the app.js 
which commands the current url of the page
let	book_id=null, 		//This is the book id variable we need it on page where a single book will be displayed (viewBook.html)
	issue_count = 0,	//How many copies are issued
	left = 0;			//How much books are left
	
 if(url.includes('viewBook.html'))        //Checking if Current URL Contains viewBook.html 
 //Getting Book ID From URL 
	book_id = window.location.hash.substr(1);
	let book = getBookById(book_id);	//Get Book By Book Id Using function
	//Check if No Book Found
	if(book==null){
		window.location.href='index.html';		//Redirecting to index.html Page
	}
	issue_count = issueDetailsById(book_id).length;		//How many books are issued 
	left = book.quantity-issue_count;					//How much books are left
	displayBook(book);									//Display Book (Generating HTML)
}

	let issue_date = Math.floor(Date.now() / 1000);	//Get Current Timestamp
		let return_date = issue_date+(86400*14);	//Calculating Return Date 86400 Seconds in 1 Day and *14  is added to issued_date (timestamp)
		let item = getIssuedBooks(book_id);			//Getting Old Issued Books
		
		 item.push(data);			//Adding a New item (Issue Book)
	    localStorage.setItem("issued_books",JSON.stringify(item));	//Setting into localStorage
	    issue_form.reset();	//Reset Issue Form
	    window.location.reload();	//Reload Page
	    
	    

	

function getBookById(id)     //This function will get Book Details By Id


function getBooks() //	Get All Books from Localstorage


/*
	Get Issue Details of Book By ID (e.g this book is issued to which students)
*/
function issueDetailsById(book_id){
	let issued_books = getIssuedBooks(); //Get All Issued Books
	let data = [];  //Initialize a Array

	//Loop Through all issued Books
	issued_books.map(function(book){
		if(book.book_id==book_id){		//If book id is matched with the passed book_id then we push into data(letiable)
			data.push(book);
		}
	})
	return data;
}


/*
	This function will generate Table of Books for Books.html (Table Format)
*/
function booksTable()




/*
	This function will generate List of Books for Home Page i.e Index.html
*/
function booksList(){
	let books = getBooks(); //Get Books From Storage
	if(books.length<=0){	//Check if there are no books
		books = generateRandomBooks();	//Generate Random Books
	}
	let html='';
	//Generate Books HTML 
	books.map(function(book){
		html+="<a href='viewBook.html#"+book.id+"' class='book'><strong>"+book.title+"</strong>"+
		"<p>Published By: <strong>"+book.publisher+"</strong></p>"+
		"</a>";
	});
	//Set final HTML to books-list Element
	document.getElementById("books-list").innerHTML=html;
}


/*
	This function is Used to Generate Random Books (when there are no books in Localstorage)
*/
function generateRandomBooks()