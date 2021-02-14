import React from 'react'
import './BookContainer.css'

export default class BookContainer extends React.Component {

    render() {
        const { error, isLoaded, items } = this.props;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="dashboard">
                    {items.map(item => (
                        <div key={item.id} className="bookCard">
                            <p className="title">{item.volumeInfo.title}</p>
                            <p className="details">Authors: {item.volumeInfo.authors.toString()}</p>
                            <p className="details">Publisher: {item.volumeInfo.publisher}</p>
                            <p className="details">Published Date: {item.volumeInfo.publishedDate}</p>
                        </div>
                    ))}
                </div>
            )
        }
    }
}