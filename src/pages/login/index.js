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
        email: true,
        password: true
    });

    const [typeFieldPassword, setTypeFieldPassword] = useState('password')

    const history = useHistory();

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

    const onSubmit = async (event) => {
        event.preventDefault();
        loaderContext.showLoader()
        try {
            const user = await userService.authenticate('login', inputData);

            userContext.logIn(user);
            history.push('/books/all');
        } catch (error) {
            notificationContext.showNotification(error);
        }
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
                                    message='Password shoud be between 3 and 16 letters and digits'
                                />
                                    <InputPasswordEl
                                     classNameDivEl='input-group'
                                     classNameSpanEl='span-el'
                                     classNameIEl='fa fa-eye'
                                     type={typeFieldPassword}
                                     name='password'
                                     placeholder='Password'
                                     value={password}
                                     isValid={correctPassword}
                                     onChange={onChange}
                                     showHidePassword={showHidePassword}
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
            </div >
        </PageLayout>
    )
}

export default Login;