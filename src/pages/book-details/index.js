import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import PageLayout from '../../components/page-layout';
import CommentCreate from '../../components/comment-create';
import CommentDetails from '../../components/comment-details'
import styles from './index.module.css';
import getCookie from '../../utils/getCookie'
import bookService from '../../services/book-service';
import { UserContext, NotificationContext, LoaderContext } from '../../Context';
import commentService from '../../services/coment-service';
import LinkButton from '../../components/link-button';
import FunctionButton from '../../components/function-button';


const BookDetails = (props) => {

    const [state, setMyState] = useState({
        book: null,
        isCreator: null,
        showContact: false,
        voted: false
    })
    const userContext = useContext(UserContext);
    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);
    const match = useRouteMatch();
    const history = useHistory();
    const bookId = match.params.id;
    const token = getCookie('x-auth-token');

    useEffect(() => {
        async function fetchData() {
            loaderContext.showLoader();
            const response = await bookService('GET', bookId);
            const book = await response.json();
            setMyState({ ...state, book, isCreator: book.creator._id === userContext.user._id });
        }

        if (!state.book) { fetchData(); }

    }, [state, bookId, userContext, loaderContext])

    const handleDeleteBook = async (bookId) => {
        try {
            const result = await bookService('DELETE', bookId, undefined, token);

            if (result.ok) {
                history.push('/books/all');
            } else {
                const errors = [{ msg: `Could not delete book!` }]
                throw errors
            }

        } catch (error) {
            notificationContext.showNotification(error);
        }
    }

    const toggleShowContact = (showContact) => {
        setMyState({ ...state, showContact: !showContact })
    }

    const rateBook = async (book, rate) => {
        const ratedBook = { ...book };
        ratedBook[rate] = ratedBook[rate] + 1;
        loaderContext.showLoader();
        try {
            const updatedBook = await bookService('PUT', bookId, ratedBook, token);

            if (updatedBook.ok) {
                setMyState({ ...state, book: ratedBook, voted: true });
            } else {
                const errors = await updatedBook.json();
                throw errors;
            }

        } catch (error) {
            notificationContext.showNotification(error.errors);
        }
    }

    const createComment = async (book, newComment) => {
        loaderContext.showLoader();
        try {
            const result = await commentService('POST', undefined, { 'subject': newComment, 'bookId': bookId }, token);

            if (result.status === 201) {
                const createdComment = await result.json();
                createdComment.creator = userContext.user;
                const updatedBook = { ...book };
                updatedBook.comments.push(createdComment);
                setMyState({ ...state, book: updatedBook })
            } else {
                const errors = await result.json();
                throw errors;
            }
        } catch (error) {
            notificationContext.showNotification(error.errors);;
        }
    }

    const deleteComment = async (commentId, book) => {
        loaderContext.showLoader();
        try {
            const result = await commentService('DELETE', commentId, undefined, token);

            if (result.status === 204) {
                const updatedBook = { ...book, comments: book.comments.filter(comment => comment._id !== commentId) };
                setMyState({ ...state, book: updatedBook })
            } else {
                const errors = await result.json();
                throw errors;
            }
        } catch (error) {
            notificationContext.showNotification(error.errors);
        }

    }

    const { book, isCreator, showContact, voted } = state;

    return <PageLayout>
        {book ? <div className={styles['grid-container']}>
            <div>
                <div className={styles.grid}>
                    <div className={styles['grid-item']}>
                        <div className="main-info">
                            <p className={styles.description}>{book.description}</p>
                        </div>
                    </div>
                    <div className={styles['grid-item']}>
                        <div className={styles['grid-item-fr']}>
                            <div className={styles['grid-item-fr-fc']}>
                                <p>
                                    <img className={styles['img']} src={book.imageUrl} alt={book.title} />
                                </p>
                            </div>
                            <div className={styles['grid-item-fr-sc']}>
                                <p className={styles.title}>{book.title.toUpperCase()}</p>
                                <p className={styles.othet}>{book.author.toLowerCase()}</p>
                                <p className={styles.othet}>
                                    <span>Genres {book.genres.toLowerCase()}</span>
                                </p>
                                <p className={styles.othet}>year issue {book.year}</p>
                                <p className={styles.othet}>publisher {book.publisher.toLowerCase()}</p>
                                <p className={styles.othet}>price {book.price} bgn</p>
                            </div>
                        </div>
                        <div className={styles['grid-item-sr']}>
                            <div className={styles.blue}>
                                <button
                                    disabled={isCreator | voted}
                                    onClick={() => rateBook(book, 'likes')}
                                    className={styles['grid-item-sr-b-l']}
                                >
                                    <b>{book.likes}  </b>
                                    <i className="fa fa-thumbs-up"></i>
                                </button>
                            </div>
                            {isCreator
                                ? <Fragment>
                                    <FunctionButton
                                        funct={handleDeleteBook}
                                        icon={'fa fa-trash-alt'}
                                        styleDivEl={'black'}
                                        styleBtnEl={'button-user'}
                                        bookId={book._id}
                                    />
                                    <LinkButton
                                        to={`/books/edit/${book._id}`}
                                        icon={'fa fa-edit'}
                                        styleDivEl={'black'}
                                        styleBtnEl={'button-user'}
                                    />
                                </Fragment>
                                : <FunctionButton
                                    funct={toggleShowContact}
                                    icon={'fa fa-user'}
                                    styleDivEl={'black'}
                                    styleBtnEl={'button-user'}
                                    bookId={showContact}
                                />}
                            <div className={styles.red}>
                                <button
                                    disabled={isCreator | voted}
                                    onClick={() => rateBook(book, 'dislikes')}
                                    className={styles['grid-item-sr-b-d']}
                                >
                                    <b>{book.dislikes}  </b>
                                    <i className="fa fa-thumbs-down"></i>
                                </button>
                            </div>
                        </div >
                        {showContact ? <div>
                            <p className={styles['owner-info']}>
                                You can emailed owner of the book {book.creator.username} to email: {book.creator.email} or phonecall
              to phone: {book.creator.phone}.
            </p>
                        </div> : null}
                    </div >
                    <div className={styles['grid-item']}>
                        <CommentCreate book={book} createComment={(book, newComment) => createComment(book, newComment)} />
                        <CommentDetails book={book} deleteComment={(book, commentId) => deleteComment(book, commentId)} />
                    </div >
                </div >
            </div >
        </div >
            : null}
    </PageLayout>
}

export default BookDetails;
