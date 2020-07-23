import React from 'react';

import styles from './index.module.css';
import { Link } from 'react-router-dom';

const BookUser = ({ book, handleDeleteBook }) => {

    return (
        <div key={book._id} className={styles['book-row']}>
            <div className={styles['book-title']}>
                <div className="inside-book-info">{book.title.toUpperCase()}</div>
            </div>
            <div className={styles['book-likes-buttons']}>
                <div className={styles['book-likes']}>
                    <div className={styles['inside-book-info']}>{book.likes}</div>
                    <div className={styles['inside-book-info']}>
                        <div className={styles.blue}><i className="fa fa-thumbs-up book"></i></div>
                    </div>
                    <div className={styles['inside-book-info']}>{book.dislikes}</div>
                    <div className={styles['inside-book-info']}>
                        <div className={styles.red}><i className="fa fa-thumbs-down book"></i></div>
                    </div>
                    <div className={styles['inside-book-info']}>{book.comments.length}</div>
                    <div className={styles['inside-book-info']}>
                        <div className={styles.green}><i className="fa fa-comments book"></i></div>
                    </div>
                </div>
                <div className={styles['buttons-container']}>
                    <div className={styles.buttons}>
                        <Link to={`/books/details/${book._id}`}>
                            <button className="btn">
                                <i className="fa fa-info-circle"></i>
                            </button>
                        </Link>
                        <button onClick={() => handleDeleteBook(book._id)} className="btn">
                            <i className="fa fa-trash-alt"></i>
                        </button>
                        <Link to={`/books/edit/${book._id}`}>
                            <button className="btn">
                                <i className="fa fa-edit"></i>
                            </button>
                        </Link>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default BookUser;