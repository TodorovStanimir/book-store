import React, { useState } from 'react';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import InputEl from '../../components/input-el';
import ValidatorEl from '../../components/validator-el';
import SubmitButton from '../../components/submit-button';
import LinkEl from '../../components/link-el';
import { emailValidator, passwordValidator } from '../../utils/validators';
import userService from '../../services/user-service';
import Notification from '../../components/notification';

const Login = (props) => {
    const [inputData, setInputState] = useState({
        email: '',
        password: ''
    });

    const [validators, setValidators] = useState({
        email: true,
        password: true
    });

    const [notification, setNotification] = useState({
        message: '',
        show: false
    });

    const onChange = (e) => {
        const currentValidator = {
            email: emailValidator,
            password: passwordValidator
        }[e.target.name].test(e.target.value);

        setInputState({ ...inputData, [e.target.name]: e.target.value });
        setValidators({ ...validators, [e.target.name]: currentValidator });
    }

    const { email, password } = inputData;
    const { email: correctEmail, password: correctPassword } = validators;
    const { message, show } = notification;

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await userService.loginUser(email, password);   
        } catch (error) {
            setNotification({ ...notification, message: error.statusText, show: true })
            setTimeout(() => { setNotification({ ...notification, message: '', show: false }) }, 3000)
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
                                    message='Email shoud be a valid email address'
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-envelope'
                                    type='email'
                                    name='email'
                                    placeholder='E-mail'
                                    value={email}
                                    isValid={correctEmail}
                                    onChange={onChange}
                                />
                                <ValidatorEl
                                    validator={correctPassword}
                                    message='Password shoud be between 3 and 16 symbols: letters and digits'
                                />
                                <InputEl
                                    classNameDivEl='input-group'
                                    classNameSpanEl='span-el'
                                    classNameIEl='fa fa-lock'
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={password}
                                    isValid={correctPassword}
                                    onChange={onChange}
                                />
                                <SubmitButton btnText={'Login in Your account'} disabled={btnDisabled} />
                                <LinkEl
                                    className={'login-link'}
                                    to={'/profile/register'}
                                    linkText={'Have not an account? Register here'}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div >
                <Notification show={show} message={message} />
            </div >
        </PageLayout>
    )
}

export default Login;