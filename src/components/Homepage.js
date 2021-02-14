import React from 'react'
import BookContainer from './BookContainer';
import './BookContainer.css'
import Form from './Form'

export default class Homepage extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        items: [],
        book_items: [],
        searchTerm: "",
        openForm: false
    }

    componentDidMount() {
        fetch("https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items,
                        book_items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    searchBook = (e) => {
        this.setState({ searchTerm: e.target.value }, () => {
            let filtered_list = [...this.state.items]
            let result = []
            let bookList = this.state.book_items || [];
            if (this.state.searchTerm.length > 0) {
                let searchBook = this.state.searchTerm.toLowerCase()

                result = bookList.filter(p =>
                    p.volumeInfo.title.toLowerCase().trim().match(searchBook)
                    || p.volumeInfo.authors.toString().toLowerCase().trim().match(searchBook)
                    || p.volumeInfo.publisher.toLowerCase().trim().match(searchBook))
                filtered_list = result;
                this.setState({ ...this.state, items: filtered_list })
            } else {
                this.setState(this.setState({ ...this.state, items: bookList }))
            }
        })
    }
    togglePopup = () => {
        this.setState({ openForm: !this.state.openForm })
    }
    addBook = (payload) => {
        this.setState({ items: [...this.state.items, payload], book_items: [...this.state.book_items, payload] })
    }

    render() {
        const { error, isLoaded, items } = this.state;
        return (<>
            <div className="container">
                <header className="topBar">
                    <div className="mainHeading">Books</div>
                    <button className="button" onClick={this.togglePopup}>Create New Book</button>
                </header>
                <div className="search">
                    <span className="searchIcon"><ion-icon name="search-outline"></ion-icon></span>
                    <input type="text"
                        placeholder="Search"
                        className="searchBox"
                        value={this.state.searchTerm}
                        onChange={(e) => this.searchBook(e)}>
                    </input>
                </div>
                <div className="subHeading">All Books</div>
                <BookContainer items={items} error={error} isLoaded={isLoaded} />
            </div>
            {this.state.openForm && <Form toggle={this.togglePopup} addBook={this.addBook} />}
        </>
        )
    }
}