import React from 'react';

import styles from './index.module.css';

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
                        <a href={`/books/details/${book._id}`}>
                            <button className="btn">
                                <i className="fa fa-info-circle"></i>
                            </button>
                        </a>
                        <button onClick={() => handleDeleteBook(book._id)} className="btn">
                            <i className="fa fa-trash-alt"></i>
                        </button>
                        <a href={`/books/edit/${book._id}`}>
                            <button className="btn">
                                <i className="fa fa-edit"></i>
                            </button>
                        </a>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default BookUser;