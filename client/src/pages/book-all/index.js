import React, { useState, useContext, useEffect, Fragment } from 'react';
import PageLayout from '../../components/page-layout';
import styles from './index.module.css';
import Book from '../../components/book';
import getCookie from '../../utils/getCookie'
import bookService from '../../services/book-service';
import { NotificationContext, LoaderContext } from '../../Context';

const Books = (props) => {

    const [state, setState] = useState({
        books: [],
        total: null,
        per_page: null,
        current_page: null
    });

    const perPage = 3;

    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const getBooks = async (pageNumber, perPage) => {
        loaderContext.showLoader();
        const data = await bookService({ method: 'get', pageNumber, perPage });

        setState({
            books: data.data,
            total: data.total,
            per_page: data.per_page,
            current_page: data.page,
        })
    };

    useEffect(() => {
        getBooks(1, perPage);
        // eslint-disable-next-line
    }, [])

    const deleteBook = async (bookId) => {
        const token = getCookie('x-auth-token');

        loaderContext.showLoader();

        const result = await bookService({ method: 'delete' }, bookId, null, token)

        if (Array.isArray(result) || result.isAxiosError) {
            notificationContext.showNotification([{ msg: `Could not delete book!` }]);
            return;
        }
        const modifiedBooks = state.books.filter(book => book._id !== bookId)
        setState({ ...state, books: modifiedBooks })
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(state.total / state.per_page); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        let classes = state.current_page === number ? styles.active : '';
        return (
            <span key={number} className={classes} onClick={() => getBooks(number, perPage)}>{number}</span>
        );
    });

    const books = state.books && state.books.length>0 && state.books.map(book => <Book book={book} key={book._id} deleteBook={deleteBook} />)
    return (
        <PageLayout>
            {books
                ? <Fragment><div className={styles.pagination}>
                    <span onClick={() => getBooks(1, perPage)}>&laquo;</span>
                    {renderPageNumbers}
                    <span onClick={() => getBooks(pageNumbers.length, perPage)}>&raquo;</span>
                </div>
                    <div className={styles['grid-container']}>
                        <div className={styles.grid}>
                            {books}
                        </div >
                    </div >
                </Fragment>
                : null}
        </PageLayout>
    )
}


export default Books;