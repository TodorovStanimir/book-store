import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';

import styles from './index.module.css';
import data from '../../books.json'
import Book from '../../components/book';

class Books extends Component {

    render() {
        const books = data.map(book => <Book book={book} key={book._id} />)
        return (
            <PageLayout>
                <div className={styles['grid-container']}>
                    <div className={styles.grid}>
                        {books}
                    </div >
                </div >
            </PageLayout>
        )
    }
}


export default Books;