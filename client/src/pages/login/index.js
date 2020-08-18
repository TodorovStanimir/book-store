/* global i18n */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import InputEl from '../../components/input-el';
import ValidatorEl from '../../components/validator-el';
import SubmitButton from '../../components/submit-button';
import LinkEl from '../../components/link-el';
import { emailValidator, passwordValidator } from '../../utils/validators';
import userService from '../../services/user-service';
import { UserContext, NotificationContext, LoaderContext } from '../../Context';
import InputPasswordEl from '../../components/input-password-el';

const Login = (props) => {
    const userContext = useContext(UserContext);
    const notificationContext = useContext(NotificationContext);
    const loaderContext = useContext(LoaderContext);

    const [inputData, setInputState] = useState({
        email: '',
        password: ''
    });

    const [validators, setValidators] = useState({
        correctEmail: true,
        correctPassword: true
    });

    const [typeFieldPassword, setTypeFieldPassword] = useState('password')

    const history = useHistory();

    const onChange = (e) => {

        const currentValidator = {
            correctEmail: emailValidator,
            correctPassword: passwordValidator
        }[e.target.dataset.validator].test(e.target.value);

        setInputState({ ...inputData, [e.target.name]: e.target.value });
        setValidators({ ...validators, [e.target.dataset.validator]: currentValidator });
    }

    const { email, password } = inputData;
    const { correctEmail, correctPassword } = validators;

    const onSubmit = async (event) => {
        event.preventDefault();
        loaderContext.showLoader()

        const user = await userService.authenticate('login', inputData);
        if (Array.isArray(user) || user.isAxiosError) {
            notificationContext.showNotification(user);
            return;
        }
        userContext.logIn(user);
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
                                    classNameIEl='fa fa-envelope'
                                    type='email'
                                    name='email'
                                    placeholder={i18n('email')}
                                    value={email}
                                    isValid={correctEmail}
                                    onChange={onChange}
                                    validator='correctEmail'
                                />
                                <ValidatorEl
                                    validator={correctPassword}
                                    message={i18n('userPasswordField')}
                                />
                                <InputPasswordEl
                                    classNameDivEl='input-group'
                                    classNameIEl='fa fa-eye'
                                    type={typeFieldPassword}
                                    name='password'
                                    placeholder={i18n('userPassword')}
                                    value={password}
                                    isValid={correctPassword}
                                    onChange={onChange}
                                    showHidePassword={showHidePassword}
                                    validator='correctPassword'
                                />
                                <SubmitButton btnText={i18n('userLoginInAccount')} disabled={btnDisabled} />
                                <LinkEl
                                    className={'login-link'}
                                    to={'/profile/register'}
                                    linkText={i18n('userHaveNotAnAccount')}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div >
            </div >
        </PageLayout>
    )
}

export default Login;