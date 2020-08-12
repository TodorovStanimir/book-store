/* global i18n */
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
import InputUploadEl from '../../components/input-upload-el';

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

    const [uploadImgBtnDisabled, setUploadImgBtnDisabled] = useState(false);

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

        const result = await bookService({method: 'delete'}, bookId, null, token)

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

    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dv0zd1ahz',
                uploadPreset: 'booksstore',
            },
            (error, result) => {
                if (result.event === 'success') {
                    setState({ ...editedUser, imageUrl: result.info.url })
                    setValidators({ ...validators, imageUrl: true })
                    setUploadImgBtnDisabled(true)
                }
            },
        ).open();
    };

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
                                message={i18n('userEmailField')}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-envelope'
                                type='email'
                                name='email'
                                placeholder={i18n('email')}
                                isValid={correctEmail}
                                value={email}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctPhone}
                                message={i18n('userPhoneField')}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-phone'
                                type='text'
                                name='phone'
                                placeholder={i18n('userPhone')}
                                isValid={correctPhone}
                                value={phone}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctOccupation}
                                message={i18n('userOccupationField')}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-building'
                                type='text'
                                name='occupation'
                                placeholder={i18n('userOccupation')}
                                isValid={correctOccupation}
                                value={occupation}
                                onChange={e => onChange(e)}
                            />
                            <ValidatorEl
                                validator={correctImageUrl}
                                message={i18n('userImageUrlField')}
                            />
                            {/* <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-image'
                                type='url'
                                name='imageUrl'
                                placeholder={i18n('userImageUrl')}
                                isValid={correctImageUrl}
                                value={imageUrl}
                                onChange={e => onChange(e)}
                            /> */}
                            <InputUploadEl
                                classNameDivEl={'input-group'}
                                classNameIEl={'fa fa-image'}
                                classNameBtnEl={'userbtn'}
                                type='url'
                                name='imageUrl'
                                placeholder={i18n('userImageUrl')}
                                btntext={i18n('uploadImgButton')}
                                isValid={correctImageUrl}
                                value={imageUrl}
                                onChange={e => onChange(e)}
                                onClick={openWidget}
                                disabled={uploadImgBtnDisabled}
                            />

                            <img className={styles.img} src={editedUser.imageUrl} alt={editedUser.username} />

                            <SubmitButton
                                className={'submit-button-userprofile'}
                                btnText={i18n('userChangeProfile')}
                                disabled={btnDisabled} />
                        </form>
                    </div>
                    <div className={styles['book-info']}>
                        <div className={styles['book-summary']}>
                            <p>{i18n('userProfileReport', [editedUser.books.length, editedUser.books.reduce((acc, cur) => acc += cur.comments.length, 0)])}</p>
                        </div>
                        {booksUser}
                    </div >
                </div >
            </div >
        </PageLayout>
    )
}

export default Profile;