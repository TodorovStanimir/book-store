/* global i18n */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import InputEl from '../../components/input-el';
import InputPasswordEl from '../../components/input-password-el'
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

    const [typeFieldPassword, setTypeFieldPassword] = useState('password')

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

        const registeredUser = await userService.authenticate('register', inputData);

        if (Array.isArray(registeredUser) || registeredUser.isAxiosError) {
            notificationContext.showNotification(registeredUser);
            return;
        }
        userContext.logIn(registeredUser);
        history.push('/books/all');
    }

    const showHidePassword = () => {
        setTypeFieldPassword({
            'password': 'text',
            'text': 'password'
        }[typeFieldPassword]);
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
                                    message={i18n('userEmailField')}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-envelope'
                                    type='email'
                                    name='email'
                                    placeholder={i18n('email')}
                                    isValid={correctEmail}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctUsername}
                                    message={i18n('userNameField')}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-user'
                                    type='text  '
                                    name='username'
                                    placeholder={i18n('username')}
                                    isValid={correctUsername}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctPhone}
                                    message={i18n('userPhoneField')}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-phone'
                                    type='text'
                                    name='phone'
                                    placeholder={i18n('userPhone')}
                                    isValid={correctPhone}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctOccupation}
                                    message={i18n('userOccupationField')}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-building'
                                    type='text'
                                    name='occupation'
                                    placeholder={i18n('userOccupation')}
                                    isValid={correctOccupation}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctPassword}
                                    message={i18n('userPasswordField')}
                                />
                                <InputPasswordEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-eye'
                                    type={typeFieldPassword}
                                    name='password'
                                    placeholder={i18n('userCreatePassword')}
                                    isValid={correctPassword}
                                    onChange={onChange}
                                    showHidePassword={showHidePassword}
                                />
                                <ValidatorEl
                                    validator={correctRePassword}
                                    message={i18n('userRepeatPasswordField')}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-lock'
                                    type='password'
                                    name='rePassword'
                                    placeholder={i18n('userRepeatPassword')}
                                    isValid={correctRePassword}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctImageUrl}
                                    message={i18n('userImageUrlField')}
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-image'
                                    type='url'
                                    name='imageUrl'
                                    placeholder={i18n('userImageUrl')}
                                    isValid={correctImageUrl}
                                    onChange={onChange}
                                />
                                <SubmitButton btnText={i18n('userCreateAccount')} disabled={btnDisabled} />
                                <LinkEl className='login-link'
                                    to='/profile/login'
                                    linkText={i18n('userHaveAccount')} />
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