import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import InputEl from '../../components/input-el';
import ValidatorEl from '../../components/validator-el';
import SubmitButton from '../../components/submit-button';
import LinkEl from '../../components/link-el';
import { emailValidator, usernameValidator, phoneValidator, } from '../../utils/validators';
import { occupationValidator, imageUrlValidator, passwordValidator } from '../../utils/validators';
import userService from '../../services/user-service';
import { UserContext, NotificationContext, LoaderContext } from '../../Context';

const Register = (props) => {
    const userContext = useContext(UserContext)
    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);
    const [inputData, setInputState] = useState({
        email: '',
        username: '',
        phone: '',
        occupation: '',
        password: '',
        rePassword: '',
        imageUrl: ''
    });

    const [validators, setValidators] = useState({
        email: true,
        username: true,
        phone: true,
        occupation: true,
        password: true,
        rePassword: true,
        imageUrl: true
    });

    const history = useHistory();

    const onChange = (e) => {
        const currentValidator = {
            email: emailValidator,
            username: usernameValidator,
            phone: phoneValidator,
            occupation: occupationValidator,
            password: passwordValidator,
            rePassword: new RegExp(`^${inputData.password}$`),
            imageUrl: imageUrlValidator
        }[e.target.name].test(e.target.value)

        const rePassword = e.target.name === 'password'
            ? e.target.value === inputData.rePassword
            : e.target.name === 'rePassword' ? currentValidator : validators.rePassword;

        setInputState({ ...inputData, [e.target.name]: e.target.value })
        setValidators({ ...validators, [e.target.name]: currentValidator, rePassword: rePassword })
    }

    const {
        email: correctEmail,
        username: correctUsername,
        phone: correctPhone,
        occupation: correctOccupation,
        password: correctPassword,
        rePassword: correctRePassword,
        imageUrl: correctImageUrl
    } = validators;

    const onSubmit = async (e) => {
        e.preventDefault();
        loaderContext.showLoader();
        try {
            const registeredUser = await userService.authenticate('register', inputData);

            userContext.logIn(registeredUser);
            history.push('/books/all');
        } catch (error) {
            notificationContext.showNotification(error);
        }
    }
    const btnDisabled = Object.values(validators).includes(false) || Object.values(inputData).includes('');

    return (
        <PageLayout>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <div className={styles['form-container']}>
                            <form onSubmit={onSubmit}>
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
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctUsername}
                                    message={'Username shoud be in format Xxxxx Xxxxx'}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-user'
                                    type='text  '
                                    name='username'
                                    placeholder='Username'
                                    isValid={correctUsername}
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
                                    placeholder='Occupation'
                                    isValid={correctOccupation}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctPassword}
                                    message={'Password shoud be between 3 and 16 symbols: letters and digits'}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-lock'
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    isValid={correctPassword}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctRePassword}
                                    message={'Passwords do not match'}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-lock'
                                    type='password'
                                    name='rePassword'
                                    placeholder='Repeat password'
                                    isValid={correctRePassword}
                                    onChange={onChange}
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
                                    placeholder='image Url'
                                    isValid={correctImageUrl}
                                    onChange={onChange}
                                />
                                <SubmitButton btnText={'Create an Account'} disabled={btnDisabled} />
                                <LinkEl className='login-link'
                                    to='/profile/login'
                                    linkText='Have an account? Log in here' />
                            </form>
                        </div>
                    </div >
                    <div className="col-lg-4"></div>
                </div >
            </div >
        </PageLayout>
    )
}

export default Register