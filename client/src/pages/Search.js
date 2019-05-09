import React, {Component} from "react";
import {withAlert} from "react-alert";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/SearchForm";
import Cards from "../components/Cards";
import { booleanLiteral } from "@babel/types";


//Function to format the book results that are returned from the API, it can be used on card page as well 
const formatBookResults = googleApiResults => {
    const bookArray = [];

    googleApiResults.map(book => {
        const formattedBook = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors
            ? book.volumeInfo.authors
            : ['Author not listed.'],
            description: book.volumeInfo.description
            ? book.volumeInfo.description
            : "Description not avaialable.",
            googleBookId: book.id,
            thumbnail: book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',
            link: book.volumeInfo.canonicalVolumeLink,
            pageCount: book.volumeInfo.pageCount,
            subtitle: book.volumeInfo.subtitle,
            publishedDate: book.volumeInfo.publishedDate
        };

        bookArray.push(formattedBook);
        return bookArray
    });
return bookArray;
};

class Search extends Component {
    state = {
    search: '',
    results: [],
    error:' '
};
    
//Method for saving a book to the database
saveBook = event => {

    const chosenBook = this.state.results.find(book => book.googleBookId === event.targer.id);

    const newSave = {
        Title: chosenBook.title,
        authors: chosenBook.authors,
        description: chosenBook.description,
        googleBookId: chosenBook.googleBookId,
        thumbnail: chosenBook.thumbnail,
        link: chosenBook.link,
        pageCount: chosenBook.pageCount,
        subtitle: chosenBook.subtitle,
        pusblisheddate: chosenBook.publishedDate
    };

    API.saveBook(newSave)
    .then( res => {
        console.log(res.status, res.statusText);
        this.props.alert.show('Book Saved', {type: 'success'})
    })
    .catch(err => {
        console.log(err);
        this.props.alert.show("Sorry, we are trying to figure out what's going on back here....", {
            type: "error",
            timeout: 3000
        })

    })

};

//Method for input field.
handleInputChange = event => {
    this.setState({search: event.target.value})
};

//Method for submission of the search
handleFormSubmit = event => {
    event.preventDefault();
    API.getGoogleBooks(this.state.search)
    .then(res => {
        const formattedArry = formatBookResults(res.data.items);
        this.setState({results: formattedArray});
    })
    .cath(err => console.log(err))
};

render(){
    return(
        <div className="container">
        
        <Jumbotron
        title="Search"
        lead="The Google Books API"
        instructions="Search for a book; then view it on Google Books, or add it to your Bookshelf..."
        image="books_2.jpeg "
        />

        <SearchForm
        handleInputChange={this.handleInputChange}
        handleFormSubmit={this.handleFormSubmit}
        />

        <Cards
        books={this.state.results}
        buttonAction={this.saveBook}
        buttonType="btn btn-success mt-2"
        buttonText="Save Book"
        />
    </div>
    );
  }
}

export default withAlert(Search);