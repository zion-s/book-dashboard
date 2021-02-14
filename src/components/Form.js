import React from 'react'

export default class Form extends React.Component {
    state = {
        book: {
            volumeInfo: {
                title: "",
                authors: [],
                publisher: "",
                publishedDate: ""
            }
        }
    }
    setDetails = (field, e) => {
        switch (field) {
            case "title": return this.setState({ book: { ...this.state.book, volumeInfo: { ...this.state.book.volumeInfo, title: e.target.value } } })
            case "authors": return this.setState({ book: { ...this.state.book, volumeInfo: { ...this.state.book.volumeInfo, authors: e.target.value } } })
            case "publisher": return this.setState({ book: { ...this.state.book, volumeInfo: { ...this.state.book.volumeInfo, publisher: e.target.value } } })
            case "publishedDate": return this.setState({ book: { ...this.state.book, volumeInfo: { ...this.state.book.volumeInfo, publishedDate: e.target.value } } })
        }
    }

    submitBook = () => {
        let payload = this.state.book
        this.props.addBook(payload)
    }

    render() {
        return (
            <div className="form-popup">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                    <p className="subHeading" style={{ marginLeft: 40 }}>Enter Book Details</p>
                    <div style={{ marginRight: 20, cursor: 'pointer' }} onClick={this.props.toggle}>close</div>
                </div>
                <input type="text"
                    placeholder="Book Title"
                    className="searchBox"
                    value={this.state.book.volumeInfo.title}
                    onChange={(e) => this.setDetails("title", e)}>
                </input>
                <input type="text"
                    placeholder="Author"
                    className="searchBox"
                    value={this.state.book.volumeInfo.authors}
                    onChange={(e) => this.setDetails("authors", e)}>
                </input>
                <input type="text"
                    placeholder="Publisher"
                    className="searchBox"
                    value={this.state.book.volumeInfo.publisher}
                    onChange={(e) => this.setDetails("publisher", e)}>
                </input>
                <input type="date"
                    placeholder="Date of Publishing"
                    className="searchBox"
                    value={this.state.book.volumeInfo.publishedDate}
                    onChange={(e) => this.setDetails("publishedDate", e)}>
                </input>
                <button className="button"
                    onClick={() => { this.submitBook(); this.props.toggle() }}
                    disabled={this.state.book.volumeInfo.title === "" || this.state.book.volumeInfo.authors === ""
                        || this.state.book.volumeInfo.publisher === "" || this.state.book.volumeInfo.publishedDate === "" ? true : false}>
                    Create New Book</button>
            </div>
        )
    }
}