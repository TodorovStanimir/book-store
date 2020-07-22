import React, { useState } from 'react';

import styles from './index.module.css';

import bookss from '../../books.json';
import users from '../../users.json';

const Profile = () => {
    const [editedUser, setState] = useState(users[0]);
    const [controls, setControls] = useState({
        email: true,
        phone: true,
        occupation: true,
        imageUrl: true
    });

    const books = bookss.filter(book => book.creator._id === editedUser._id);
    const isValid = true;

    const handleEditUser = (e) => {
        e.preventDefault();
        console.log(editedUser, controls);
    }

    const handleDeleteBook = (bookId) => {
        console.log(bookId)
    }

    const onChange = (e) => {
        const currentControl = {
            email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            phone: /^[+]{1}\d{10,}$/,
            occupation: /(^[A-Za-z ]+$)|(^[А-Яа-я ]+$)/,
            imageUrl: /^(https:\/\/|http:\/\/).+/
        }[e.target.name].test(e.target.value)

        setState({ ...editedUser, [e.target.name]: e.target.value })
        setControls({ ...controls, [e.target.name]: currentControl })
    }

    const { email, phone, occupation, imageUrl } = editedUser;
    const { email: correctEmail, phone: correctPhone, occupation: correctOccupation, imageUrl: correctImageUrl } = controls;
    return (
        <div className={styles['grid-container']}>
            <div className={styles.grid}>
                <div className={styles['user-info']}>
                    <form onSubmit={(e) => handleEditUser(e)}>
                        <div className={styles['user-info-form-group']}>
                            <div className="input-group-prepend">
                                <span className={styles['span-el']}>
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                            <input
                                type="email"
                                className={isValid ? styles.valid : styles.invalid}
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        {correctEmail
                            ? null
                            : <div className={styles['info-field']}>Email shoud be a valid email address, like example@example.extension!</div>
                        }
                        <div className={styles['user-info-form-group']}>
                            <div className="input-group-prepend">
                                <span className={styles['span-el']}>
                                    <i className="fa fa-phone"></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                className={isValid ? styles.valid : styles.invalid}
                                placeholder="Phone number"
                                name="phone"
                                value={phone}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        {correctPhone
                            ? null
                            : <div className={styles['info-field']}>Phone number should consists country code and at least 7 digits!</div>
                        }
                        <div className={styles['user-info-form-group']}>
                            <div className="input-group-prepend">
                                <span className={styles['span-el']}>
                                    <i className="fa fa-building"></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                className={isValid ? styles.valid : styles.invalid}
                                placeholder="Occupation"
                                name="occupation"
                                value={occupation}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        {correctOccupation
                            ? null
                            : <div className={styles['info-field']}>Occupation field should consists only letters!</div>
                        }
                        <div className={styles['user-info-form-group']}>
                            <div className="input-group-prepend">
                                <span className={styles['span-el']}>
                                    <i className="fa fa-image"></i>
                                </span>
                            </div>
                            <input
                                type="url"
                                className={isValid ? styles.valid : styles.invalid}
                                placeholder="userImageUrl"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        {correctImageUrl
                            ? null
                            : <div className={styles['info-field']}>Image Url should start wth http:// or https://</div>
                        }
                        <div className="form-group">
                            <img src={editedUser.imageUrl} alt={editedUser.username} width="120" height="160" />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-success text-center"
                                disabled={!isValid}
                            >Change your profile</button>
                        </div>
                    </form>
                </div>
                <div className={styles['book-info']}>
                    <div className={styles['book-summary']}>
                        <p>You have {editedUser.books.length} books and {editedUser.books.reduce((acc, cur) => acc += cur.comments.length, 0)} comments</p>
                    </div>
                    {books.map(book => <div key={book._id} className={styles['book-row']}>
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
                            <div className={styles['"buttons-container']}>
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
                    </div >)}
                </div >
            </div >
        </div >
    )
}

export default Profile;