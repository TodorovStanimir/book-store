import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css'
import PageLayout from '../../components/page-layout/page-layout'
import InputEl from '../../components/input-el';
import ValidatorEl from '../../components/validator-el';
import { emailValidator, passwordValidator } from '../../utils/validators'

const Login = (props) => {
    const [inputData, setInputState] = useState({ email: '', password: '' });

    const [validators, setValidators] = useState({
        email: true,
        password: true
    });

    const onChange = (e) => {
        const currentValidator = {
            email: emailValidator,
            password: passwordValidator
        }[e.target.name].test(e.target.value)

        setInputState({ ...inputData, [e.target.name]: e.target.value })
        setValidators({ ...validators, [e.target.name]: currentValidator })
    }

    const { email, password } = inputData;
    const { email: correctEmail, password: correctPassword } = validators;

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
    }

    return (
        <PageLayout>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <div className={styles['form-container']}>
                            <form onSubmit={onSubmit}>
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
                                    validator={correctEmail}
                                    message='Email shoud be a valid email address, like example@example.extension!'
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
                                <ValidatorEl
                                    validator={correctPassword}
                                    message='Password shoud consists between 3 and 16 symbols: letters and digits!'
                                />
                                <div className="form-group">
                                    <button type="submit" className={styles['submit-button']}>
                                        Login in Your account
                                    </button>
                                </div>
                                <Link className={styles['register-link']} to="/profile/register">
                                    <p>Have not an account? Register here</p>
                                </Link>
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