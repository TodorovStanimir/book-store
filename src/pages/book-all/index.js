import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';

import styles from './index.module.css';
import Book from '../../components/book';
import getCookie from '../../utils/getCookie'
import Notification from '../../components/notification';
import bookService from '../../services/book-service';

class Books extends Component {
    state = {
        books: [],
        message: '',
        show: false
    }

    async componentDidMount() {
        const promise = await bookService('GET')

        const books = await promise.json();

        if (books) {
            this.setState({ books })
        }
    }

    deleteBook = async (bookId) => {
        const token = getCookie('x-auth-token');
        try {
            const result = await bookService('DELETE', bookId, null, token)

            if (result.ok) {
                const books = this.state.books.filter(book => book._id !== bookId)
                this.setState({ books })
            } else {
                const errors = [{ msg: `Could not delete book!` }]
                throw errors
            }

        } catch (error) {
            this.setState({ message: error, show: true })
            setTimeout(() => { this.setState({ message: '', show: false }) }, 3000)
        }
    }

    render() {
        const { message, show } = this.state;
        const books = this.state.books.map(book => <Book book={book} key={book._id} deleteBook={this.deleteBook} />)
        return (
            <PageLayout>
                <div className={styles['grid-container']}>
                    <div className={styles.grid}>
                        {books}
                    </div >
                    <Notification message={message} show={show} />
                </div >
            </PageLayout>
        )
    }
}


export default Books;