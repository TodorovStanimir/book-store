import React from 'react';

import styles from './index.module.css';

import { substr } from '../../services/filters';
import { Link } from 'react-router-dom';

const Book = (props) => {
    const book = props.book;
    const deleteBook = (bookId) => {
        // have to implement book delete
    }
    return (
        <div className={styles['grid-item']}>
            <div className={styles['grid-item-fr']}>
                <div className={styles['grid-item-fr-fc']}>
                    <img className={styles.img} src={book.imageUrl} alt={book.title} />
                </div>
                <div className={styles['grid-item-fr-sc']}>
                    <p className={styles.title}>{book.title.toUpperCase()}</p>
                    <p className={styles.author}>{book.author.toLowerCase()}</p>
                    <p className={styles.genres}>
                        <span>{book.genres.split(',').filter(el => el !== '').map(el => el[0].toUpperCase().concat(el.slice(1))).join(', ')}</span>
                    </p>
                    <div className={styles['buttons-container']}>
                        <div className={styles.buttons}>
                            <li>
                                <div className={styles.black}>
                                    <Link to={`/books/details/${book._id}`}>
                                        <button className={styles.button}>
                                            <i className="fa fa-info-circle"></i>
                                        </button>
                                    </Link>
                                </div>
                            </li>

                            <li>
                                <div className={styles.black}>
                                    <button className={styles.button} onClick={deleteBook(book['_id'])}>
                                        <i className="fa fa-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <Link to={`/books/edit/${book._id}`}>
                                    <div className={styles.black}>
                                        <button className={styles.button}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </div>
                                </Link>
                            </li>

                        </div>
                    </div>
                </div >
            </div >
            <div className={styles['grid-item-sr']}>
                <p>{substr(book.description, 500)}</p>
            </div>
        </div >
    )
}

export default Book;

