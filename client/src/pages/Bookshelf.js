import React, {Component} from "react";
import API from "..utils/API";
import Jumbotron from "../components/Jumbotron";
import Cards from "../components/Cards";

class Bookshelf extends Component {
    state = {books: []};

//Get all the books in the database
loadBooksself = () => {
    API.getBookself()
    .then(res => this.setState({books: res.data}))
    .cath(err => console.log(err))
};

//Delete a book
deleteBook = event => {
    API.deleteBook(event.target.id)
    .then(res => this.loadBookshelf())
    .catch(err => console.log(err))
};

//after bookself components mounts it runs loadbookself method.
componentDidMount(){
    this.loadBooksself()
}
render(){
    return(
        <div className="container">
        <Jumbotron
        title="My Bookshelf"
        load="All of your saved books in one convenient location."
        instructions="View your book at Google, or remove it from your Bookshelf"
        image="../img/books_2.jpeg "
        />
        <Cards
        books={this.state.books}
        buttonAction={this.deleteBook}
        buttonType="btn btn-light mt-2"
        buttonText="Delete Book"
        />
        </div>
    )
   }
}

export default Bookshelf;