import React, { useState } from 'react';

import PageLayout from '../../components/page-layout';
import BookUser from '../../components/book-user';
import styles from './index.module.css';

import bookss from '../../books.json';
import users from '../../users.json';
import InputEl from '../../components/input-el';
import { emailValidator, phoneValidator, occupationValidator, imageUrlValidator } from '../../utils/validators';
import ValidatorEl from '../../components/validator-el';
import SubmitButton from '../../components/submit-button';

const Profile = () => {
    const [editedUser, setState] = useState(users[0]);
    const [validators, setValidators] = useState({
        email: true,
        phone: true,
        occupation: true,
        imageUrl: true
    });

    const books = bookss.filter(book => book.creator._id === editedUser._id);

    const handleEditUser = (e) => {
        e.preventDefault();
        console.log(editedUser, validators);
    }

    const handleDeleteBook = (bookId) => {
        console.log(bookId)
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

    const { email, phone, occupation, imageUrl } = editedUser;
    const { email: correctEmail, phone: correctPhone, occupation: correctOccupation, imageUrl: correctImageUrl } = validators;

    const btnDisabled = Object.values(validators).includes(false) || Object.values(editedUser).includes('');
     
    const booksUser = books.map(book => <BookUser key={book._id} book={book} handleDeleteBook={handleDeleteBook} />)
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