import React, { useContext, Fragment } from 'react';
import styles from './index.module.css';
import { substr } from '../../services/filters';
import { UserContext } from '../../Context';
import LinkButton from '../link-button';
import FunctionButton from '../function-button';

const Book = ({ book, deleteBook }) => {
    const { isLoggedIn, user } = useContext(UserContext);
    
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
                        {isLoggedIn ? <div className={styles.buttons}>
                            <LinkButton styleDivEl='black' styleBtnEl='button' icon={'fa fa-info-circle'} to={`/books/details/${book._id}`} />
                            {book.creator._id === user._id
                                ?
                                <Fragment>
                                    <FunctionButton styleDivEl='black' styleBtnEl='button' bookId={book._id} funct={deleteBook} icon={'fa fa-trash-alt'} />
                                    <LinkButton styleDivEl='black' styleBtnEl='button' to={`/books/edit/${book._id}`} icon={'fa fa-edit'} />
                                </Fragment>
                                :
                                null
                            }
                        </div>
                            : null}
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

