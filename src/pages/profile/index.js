import React, { useState, useEffect, useContext } from 'react';

import PageLayout from '../../components/page-layout';
import BookUser from '../../components/book-user';
import styles from './index.module.css';

import InputEl from '../../components/input-el';
import { emailValidator, phoneValidator, occupationValidator, imageUrlValidator } from '../../utils/validators';
import ValidatorEl from '../../components/validator-el';
import SubmitButton from '../../components/submit-button';
import userService from '../../services/user-service';
import { UserContext, NotificationContext } from '../../Context';
import getCookie from '../../utils/getCookie';
import bookService from '../../services/book-service';

const Profile = (props) => {

    const userContext = useContext(UserContext);
    const notificationContext = useContext(NotificationContext);
    const token = getCookie('x-auth-token');
    const [editedUser, setState] = useState({ email: '', phone: '', occupation: '', imageUrl: '', books: [] });

    const userId = userContext.user._id;

    const [validators, setValidators] = useState({
        email: true,
        phone: true,
        occupation: true,
        imageUrl: true
    });

    useEffect(() => {
        async function fetchUser() {
            const user = await userService.getUser('get', userId);

            if (user.isAxiosError) {
                notificationContext.showNotification(user);
                setState({ ...editedUser, username: ' ' })
                return;
            }
            setState({ ...editedUser, ...user })
        }
        if (!editedUser.username) {
            fetchUser()
        }

    }, [userId, editedUser, notificationContext])

    const handleEditUser = async (e) => {
        e.preventDefault();

        const result = await userService.getUser('put', userId, editedUser, token);

        if (Array.isArray(result) || result.isAxiosError) {
            notificationContext.showNotification(result);
        }

    }

    const handleDeleteBook = async (bookId) => {
        const token = getCookie('x-auth-token');
        
        const result = await bookService('delete', bookId, null, token)

        if (Array.isArray(result) || result.isAxiosError) {
            notificationContext.showNotification([{ msg: `Could not delete book!` }]);
            return;
        }
        const books = editedUser.books.filter(book => book._id !== bookId)
        setState({ ...editedUser, books: [...books] })
    }

    const onChange = (e) => {
        const currentControl = {
            email: emailValidator,
            phone: phoneValidator,
            occupation: occupationValidator,
            imageUrl: imageUrlValidator
        }[e.target.name].test(e.target.value)

        setState({ ...editedUser, [e.target.name]: e.target.value })
        setValidators({ ...validators, [e.target.name]: currentControl })
    }

    const { email, phone, occupation, imageUrl, books } = editedUser;
    const { email: correctEmail, phone: correctPhone, occupation: correctOccupation, imageUrl: correctImageUrl } = validators;

    const btnDisabled = Object.values(validators).includes(false) || Object.values(editedUser).includes('');

    const booksUser = books && books.map(book => <BookUser key={book._id} book={book} handleDeleteBook={handleDeleteBook} />)
    return (
        <PageLayout>
            <div className={styles['grid-container']}>
                <div className={styles.grid}>
                    <div className={styles['user-info']}>
                        <form onSubmit={(e) => handleEditUser(e)}>
                            <ValidatorEl
                                validator={correctEmail}
                                message={'Email shoud be a valid email address'}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameSpanEl='span-el'
                                classNameIEl='fa fa-envelope'
                                type='email'
                                name='email'
                                placeholder='E-mail'
                                isValid={correctEmail}
                                value={email}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctPhone}
                                message={'Phone should consists country code and at least 7 digits'}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameSpanEl='span-el'
                                classNameIEl='fa fa-phone'
                                type='text'
                                name='phone'
                                placeholder='Phone number'
                                isValid={correctPhone}
                                value={phone}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctOccupation}
                                message={'Occupation field should consists only letters'}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameSpanEl='span-el'
                                classNameIEl='fa fa-building'
                                type='text'
                                name='occupation'
                                placeholder='Phone number'
                                isValid={correctOccupation}
                                value={occupation}
                                onChange={e => onChange(e)}
                            />
                            <ValidatorEl
                                validator={correctImageUrl}
                                message={'Image URL must start with http:// or https://'}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameSpanEl='span-el'
                                classNameIEl='fa fa-image'
                                type='url'
                                name='imageUrl'
                                placeholder='userImageUrl'
                                isValid={correctImageUrl}
                                value={imageUrl}
                                onChange={e => onChange(e)}
                            />

                            <img className={styles.img} src={editedUser.imageUrl} alt={editedUser.username} />

                            <SubmitButton
                                className={'submit-button-userprofile'}
                                btnText={'Change your profile'}
                                disabled={btnDisabled} />
                        </form>
                    </div>
                    <div className={styles['book-info']}>
                        <div className={styles['book-summary']}>
                            <p>You have {editedUser.books.length} books and {editedUser.books.reduce((acc, cur) => acc += cur.comments.length, 0)} comments</p>
                        </div>
                        {booksUser}
                    </div >
                </div >
            </div >
        </PageLayout>
    )
}

export default Profile;