import React from 'react';

import styles from './index.module.css';

const Register = () => {
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
                                    type="email"
                                    className={isValid ? styles.valid : styles.invalid}
                                    placeholder="E-mail"
                                    name="email"
                                />
                            </div>
                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>This field is required!</div>
                                    <div className={styles['info-field']}>Shoud be in format Xxxxx Xxxxx</div>
                                </div>
                                : null
                            }
                            <div className={styles['input-group']}>
                                <div className="input-group-prepend">
                                    <span className={styles['span-el']}>
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                </div>
                                <input
                                    type="username"
                                    className={isValid ? styles.valid : styles.invalid}
                                    placeholder="Username"
                                    name="username"
                                />
                            </div>
                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>This field is required!</div>
                                    <div className={styles['info-field']}>Shoud be in format Xxxxx Xxxxx</div>
                                </div>
                                : null
                            }
                            <div className={styles['input-group']}>
                                <div className="input-group-prepend">
                                    <span className={styles['span-el']}>
                                        <i className="fa fa-phone"></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className={isValid ? styles.valid : styles.invalid}
                                    placeholder="Phone number"
                                    name="phoneNumber"
                                />
                            </div>
                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>This field is required!</div>
                                    <div className={styles['info-field']}>Phone number should consists country code and at least 7 digits!</div>
                                </div>
                                : null
                            }
                            <div className={styles['input-group']}>
                                <div className="input-group-prepend">
                                    <span className={styles['span-el']}>
                                        <i className="fa fa-building"></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className={isValid ? styles.valid : styles.invalid}
                                    placeholder="Occupation"
                                    name="occupation"
                                />
                            </div>
                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>This field is required!</div>
                                    <div className={styles['info-field']}>Occupation field should consists only letters!</div>
                                </div>
                                : null
                            }
                            <div>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Password"
                                        name="password"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Password shoud consists between 3 and 16 symbols: letters and digits!</div>
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
                                        placeholder="Repeat password"
                                        v-name="rePassword"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Passwords do not match!</div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={styles['input-group']}>
                                <div className="input-group-prepend">
                                    <span className={styles['span-el']}>
                                        <i className="fa fa-image"></i>
                                    </span>
                                </div>
                                <input
                                    type="url"
                                    className={isValid ? styles.valid : styles.invalid}
                                    placeholder="image Url"
                                    name="imageUrl"
                                />
                            </div>
                            {!isValid
                                ? <div>
                                    <div className={styles['info-field']}>This field is required!</div>
                                    <div className={styles['info-field']}>Image URL must start with http:// or https://!</div>
                                </div>
                                : null
                            }
                            <div className="form-group">
                                <button type="submit" className={styles['submit-button']}
                                >Create an Account</button>
                            </div>
                            <a className={styles['login-link']} href="/profile/login">
                                <p>Have an account? Log In</p>
                            </a>
                        </form>
                    </div>
                </div >
                <div className="col-lg-4"></div>
            </div >
        </div >
    )
}

export default Register