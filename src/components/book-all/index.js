import React, { Component } from 'react';
import styles from './index.module.css';
import data from '../../data.json'
import Book from '../book';

class Books extends Component {

    render() {
        const books = data.map(book => <Book book={book} key={book._id} />)
        return (
            <div className={styles['grid-container']}>
                <div className={styles.grid}>
                    {books}
                </div >
            </div >
        )
    }
}


export default Books;