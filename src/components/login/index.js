import React from 'react';
import styles from './index.module.css'

const Login = () => {
    const isValid = true;
    return (
        <div className={styles.container}>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className={styles['form-container']}>
                        <form>
                            <div className={styles['input-group']}>
                                <div className="input-group-prepend">
                                    <span className={styles['span-el']}>
                                        <i className="fa fa-user"></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className={isValid ? styles.valid : styles.invalid}
                                    name="email"
                                    placeholder="E-mail"
                                />
                            </div>

                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>
                                        This field is required!
                                    </div>
                                    <div className={styles['info-field']}>
                                        Shoud be in format Xxxxx Xxxxx
                                    </div>
                                </div>
                                : null
                            }
                            <div className={styles['input-group']}>
                                <div className="input-group-prepend">
                                    <span className={styles['span-el']}>
                                        <i className="fa fa-lock"></i>
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className={isValid ? styles.valid : styles.invalid}
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>
                                        This field is required!
                            </div>
                                    <div className={styles['info-field']}>
                                        Password shoud consists between 3 and 16 symbols: letters and digits!
                            </div>
                                </div>
                                : null
                            }
                            <div className="form-group">
                                <button type="submit" className={styles['submit-button']}>
                                    Login in Your account
                            </button>
                            </div>
                            <a className={styles['register-link']} href="/user/register">
                                <p>Have not an account? Register here</p>
                            </a>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div >
        </div >
    )
}

export default Login;