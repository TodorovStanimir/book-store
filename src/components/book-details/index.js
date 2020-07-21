import React, { Component, Fragment } from 'react';

import CommentCreate from '../comment-create';
import CommentDetails from '../comment-details'
import styles from './index.module.css';

import data from '../../data.json';

class BookDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: null,
            isCreator: null,
            showContact: false,
            voted: false
        }
    }

    componentDidMount() {
        const book = data[0];
        this.setState({ book, isCreator: book.creator._id === '6f10cdf4b0595728d4d2c940' })
    }

    handleDeleteBook(id) {
        console.log(id)
    }

    toggleShowContact(showContact) {
        this.setState({ showContact: !showContact })
    }

    rateBook(book, rate) {
        book[rate] += 1;
        this.setState({ book, voted: true })
    }

    createComment(book, newComment) {
        //to implement save of the new Comment added to the book
        book.comments.push(newComment)
        this.setState({ book })
        console.log(book, newComment);
    }

    render() {
        const { book, isCreator, showContact, voted } = this.state;
        return book ? <div className={styles['grid-container']}>
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
                                    <img src={book.imageUrl} alt={book.title} />
                                </p>
                            </div>
                            <div className={styles['grid-item-fr-sc']}>
                                <p className={styles.title}>{book.title.toUpperCase()}</p>
                                <p className={styles.othet}>{book.author.toLowerCase()}</p>
                                <p className={styles.othet}>
                                    <span>{book.genres.toLowerCase()}</span>
                                </p>
                                <p className={styles.othet}>year issue {book.year}</p>
                                <p className={styles.othet}>publisher {book.publisher.toLowerCase()}</p>
                                <p className={styles.othet}>price {book.price} bgn</p>
                            </div>
                        </div>
                        <div className={styles['grid-item-sr']}>
                            <div>
                                <button
                                    disabled={isCreator | voted}
                                    onClick={() => this.rateBook(book, 'likes')}
                                    className={styles['grid-item-sr-b-l']}
                                >
                                    <b>{book.likes}  </b>
                                    <i className="fa fa-thumbs-up"></i>
                                </button>
                            </div>
                            {isCreator
                                ? <Fragment>
                                    <div>
                                        <button onChange={this.handleDeleteBook(book._id)} className={styles['button-user']}>
                                            <i className="fa fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <a href={`/books/edit/${book._id}`}>
                                            <button className={styles['button-user']}>
                                                <i className="fa fa-edit"></i>
                                            </button>
                                        </a>
                                    </div>
                                </Fragment>
                                : <div>
                                    <button className={styles['button-user']} onClick={() => this.toggleShowContact(showContact)}>
                                        <i className="fa fa-user"></i>
                                    </button>
                                </div>}
                            <div>
                                <button
                                    disabled={isCreator | voted}
                                    onClick={() => this.rateBook(book, 'dislikes')}
                                    className={styles['grid-item-sr-b-d']}
                                >
                                    <b>{book.dislikes}  </b>
                                    <i className="fa fa-thumbs-down"></i>
                                </button>
                            </div >
                        </div >
                        {showContact ? <div>
                            <p className={styles['owner-info']}>
                                You can emailed owner of the book {book.creator.username} to email: {book.creator.email} or phonecall
              to phone: {book.creator.phone}.
            </p>
                        </div> : null}
                    </div >

                    <div className={styles['grid-item']}>
                        <CommentCreate book={book} createComment={(book, newComment) => this.createComment(book, newComment)} />
                        <CommentDetails comments={book.comments} />
                    </div >
                </div >
            </div >
        </div >
            : null
    }
}

export default BookDetails;
