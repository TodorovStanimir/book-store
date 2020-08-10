import React from 'react';

import styles from './index.module.css';
import FunctionButton from '../function-button';
import LinkButton from '../link-button';

const BookUser = ({ book, handleDeleteBook }) => {

    return (
        <div key={book._id} className={styles['book-row']}>
            <div className={styles['book-title']}>
                <img src={book.imageUrl} alt={book.title} height='60px' width='40px'></img>
            </div>
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
                        <LinkButton
                            styleDivEl='black'
                            styleBtnEl='button'
                            icon={'fa fa-info-circle'}
                            to={`/books/details/${book._id}`}
                        />
                        <FunctionButton
                            funct={handleDeleteBook}
                            icon={'fa fa-trash-alt'}
                            styleDivEl={'black'}
                            styleBtnEl={'button'}
                            bookId={book._id}
                        />
                        <LinkButton
                            to={`/books/edit/${book._id}`}
                            icon={'fa fa-edit'}
                            styleDivEl={'black'}
                            styleBtnEl={'button'}
                        />
                    </div>
                </div >
            </div >
        </div >
    )
}

export default BookUser;