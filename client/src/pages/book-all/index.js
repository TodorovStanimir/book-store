import React, { useState, useContext, useEffect, useCallback } from 'react';
import PageLayout from '../../components/page-layout';

import styles from './index.module.css';
import Book from '../../components/book';
import getCookie from '../../utils/getCookie'
import bookService from '../../services/book-service';
import { NotificationContext, LoaderContext } from '../../Context';

const Books = (props) => {

    const [books, setBooks] = useState([]);
    const [load, setLoad] = useState(false);

    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const getBooks = useCallback(async () => {
        const books = await bookService('get')
        setBooks(books)
        setLoad(true);
    }, []);

    useEffect(() => {
        loaderContext.showLoader();
        getBooks();
        // eslint-disable-next-line
    }, [load])

    const deleteBook = async (bookId) => {
        const token = getCookie('x-auth-token');
        
        loaderContext.showLoader();

        const result = await bookService('delete', bookId, null, token)

        if (Array.isArray(result) || result.isAxiosError) {
            notificationContext.showNotification([{ msg: `Could not delete book!` }]);
            return;
        }
        const modifiedBooks = books.filter(book => book._id !== bookId)
        setBooks(modifiedBooks)
    }


    const boooks = books.length > 0 && books.map(book => <Book book={book} key={book._id} deleteBook={deleteBook} />)
    return (
        <PageLayout>
            <div className={styles['grid-container']}>
                <div className={styles.grid}>
                    {boooks}
                </div >
            </div >
        </PageLayout>
    )

}


export default Books;