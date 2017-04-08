let url = window.location.href; 
let	book_id=null, 	
	issue_count = 0,	
	left = 0;			

let add_book_form = document.getElementById("add_book_form");
if(add_book_form){
	add_book_form.addEventListener("submit", function(e){
	    e.preventDefault();
	    let item = getBooks();
	    let data = {
	    	id:add_book_form.elements[0].value,
	    	title:add_book_form.elements[1].value,
	    	author:add_book_form.elements[2].value,
	    	publisher: add_book_form.elements[3].value,
	    	description: add_book_form.elements[4].value,
	    	quantity: add_book_form.elements[5].value
	    }
	    item.push(data);
	    localStorage.setItem("books",JSON.stringify(item));
	    add_book_form.reset();
	    alert("Book Added Successfully");

	});
}


if(url.includes('viewBook.html')){
	
	book_id = window.location.hash.substr(1);
	let book = getBookById(book_id);	//Get Book By Book Id Using function

	if(book==null){
		window.location.href='index.html';	
	}
	issue_count = issueDetailsById(book_id).length;	
	left = book.quantity-issue_count;				
	displayBook(book);								
}

let issue_form = document.getElementById("issue-form");	
//Check if Issue Form is Available
if(issue_form){
	//Add Submit Event Listener to Issue Form
	issue_form.addEventListener("submit",function(e){
		e.preventDefault();
		//If No Books left 
		if(left<=0){
			alert("No More Books Available");
			return;
		}
		let issue_date = Math.floor(Date.now() / 1000);	
		let return_date = issue_date+(86400*14);
		let item = getIssuedBooks(book_id);			
		let data = {
	    	name:issue_form.elements[0].value,
	    	class:issue_form.elements[1].value,
	    	roll_no:issue_form.elements[2].value,
	    	book_id: book_id,
	    	issue_date: issue_date,
	    	return_date: return_date
	    }
	    item.push(data);			
	    localStorage.setItem("issued_books",JSON.stringify(item));	
	    issue_form.reset();
	    window.location.reload();
	});
}




function getBookById(id){
	let book_=null;
	let books = getBooks();
	books.map(function(book){
		if(book.id==id){
			book_ = book;
		}
	})
	return book_;
}


function displayBook(book){
	let disabled = left<=0 ? 'disabled' : '';
	let html = '<h2>'+book.title+'</h2>'+
		'<h4>Publisher: <strong>'+book.publisher+'</strong></h4>'+
		'<h4>Author: <strong>'+book.author+'</strong></h4>'+
		'<h4>'+left+' Left in Store</h4>'+
		'<button '+disabled+' onclick="showIssueForm()" type="button">Issue Book</button>&nbsp;<button onclick="getIssueDetails()">Get Issue Details</button>';
		document.getElementById("data").innerHTML = html;
}

function showIssueForm(){
	issue_form.style.display="block";
}



function getBooks(){
	let storedBooks = JSON.parse(localStorage.getItem("books"));
	console.log(storedBooks);
	if(storedBooks==null){
		return [];
	}
	return storedBooks;
}



function issueDetailsById(book_id){
	let issued_books = getIssuedBooks();
	let data = [];  //Initialize a Array


	issued_books.map(function(book){
		if(book.book_id==book_id){		
			data.push(book);
		}
	})
	return data;
}


function getIssuedBooks(){
	let data = JSON.parse(localStorage.getItem("issued_books"));
	if(data==null){
		return [];
	}
	return data;
}



function getIssueDetails(){
	let issued_books = issueDetailsById(book_id); //Get Issue Details By ID
	//Generating HTML
	let html = '<table class="table"><tr><th>Name</th><th>Class</th><th>Roll No</th><th>Issue Date</th><th>Return Date</th></tr>';
	issued_books.map(function(data){
		html+='<tr><td>'+data.name+'</td><td>'+data.class+'</td><td>'+data.roll_no+'</td><td>'+getFormattedDate(data.issue_date)+'</td><td>'+getFormattedDate(data.return_date)+'</td></tr>';
	});
	html+='</table>';
	document.getElementById("issued-books").innerHTML = html;
}

function getFormattedDate(timestamp){
  let dt = new Date(timestamp*1000);
  let dd = dt.getDate(); //Getting Date
  let mm = dt.getMonth()+1; //+1 Because Jan Starts From 0
  let yyyy = dt.getFullYear(); //Full Year eg 2017
  //For Adding a Leading 0
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  return  dd+'-'+mm+'-'+yyyy;
}

function booksTable(){
	let books = getBooks();	//Getting Books From Storage
	let html='';
	books.map(function(book){
		html+="<tr><td><a href='viewBook.html#"+book.id+"'>"+book.id+"</a></td>"+
					"<td>"+book.title+"</td>"+
					"<td>"+book.publisher+"</td>"+
					"<td>"+book.author+"</td>"+
				"</tr>";
	});
	document.getElementById("books-body").innerHTML=html;
}

/*

*/
function booksList(){
	let books = getBooks();
	if(books.length<=0){
		books = generateRandomBooks();
	}
	let html='';

	books.map(function(book){
		html+="<a href='viewBook.html#"+book.id+"' class='book'><strong>"+book.title+"</strong>"+
		"<p>Published By: <strong>"+book.publisher+"</strong></p>"+
		"</a>";
	});

	document.getElementById("books-list").innerHTML=html;
}

function generateRandomBooks(){
	let randomData = [{
		author:"Scott",
		description: "Now Learn HTML Easily",
		id:9001,
		publisher: "Jane Doe",
		quantity:10,
		title: "Basics of HTML"
	},{
		author:"B. Lee",
		description: "Java is an Object oriented programming...",
		id:9002,
		publisher: "Viesely",
		quantity:9,
		title: "Core Java"
	},{
		author:"Brian D.",
		description: "Learn Javascript Basics Easily",
		id:9003,
		publisher: "John",
		quantity:8,
		title: "Basics of Javascript"
	},{
		author:"Richards",
		description: "C++ is partially object oriented language",
		id:9004,
		publisher: "Messy",
		quantity:5,
		title: "Programming in C++"
	}];
	localStorage.setItem("books",JSON.stringify(randomData));
	return randomData;
}