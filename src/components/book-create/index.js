import React from 'react';
import styles from './index.module.css';

const CreateBook = (props) => {
    const isValid = true;
    const isEdittingMode = true;
    return (
        <div className={styles['grid-container']}>
            <div className={styles.grid}>
                <div className={styles['grid-item']}>
                    <form>
                        <div className={styles.firstr}>
                            <div className={styles['firstr-firstc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-book"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Book title"
                                        name="title"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Title shoud contain at least 2 signs</div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={styles['firstr-secondc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-user-tie"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Book\'s author"
                                        name="author"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Name should contain at least 5 signs</div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-edit"></i>
                                        </span>
                                    </div>
                                    <textarea
                                        type="text"
                                        rows="3"
                                        className={isValid ? styles['valid-textarea'] : styles['invalid-textarea']}
                                        placeholder="Description"
                                        name="description"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Description should contain at least 40 signs</div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={styles['thirdr']}>
                            <div className={styles['thirdr-firstc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-folder"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Genres"
                                        name="genres"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Genres should contain genres of book separeted by comma and space!</div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={styles['thirdr-secondc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Year issue"
                                        min="1000"
                                        name="year"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Year should contain exactly 4 digits!</div>
                                        <div className={styles['info-field']}>Year can not be less then 1500 year!</div>
                                        <div className={styles['info-field']}>Year can not be bigger then current year!</div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={styles.fourthr}>
                            <div className={styles['fourthr-firstc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-user-tie"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Publisher"
                                        name="publisher"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Publishers should contain at least 6 signs</div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={styles['fourthr-secondc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-dollar-sign"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="Price"
                                        name="price"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Price should be at least 0.01</div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={styles.fifthr}>
                            <div className={styles['fifthr-firstc']}>
                                <div className={styles['input-group']}>
                                    <div className="input-group-prepend">
                                        <span className={styles['span-el']}>
                                            <i className="fa fa-image"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className={isValid ? styles.valid : styles.invalid}
                                        placeholder="ImageUrl"
                                        name="imageUrl"
                                    />
                                </div>
                                {!isValid
                                    ? <div>
                                        <div className={styles['info-field']}>This field is required!</div>
                                        <div className={styles['info-field']}>Image Url should start wth http:// or https://</div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className={styles['fifthr-secondc']}>
                                <div className="form-group">
                                    {!isEdittingMode
                                        ? <button
                                            type="submit"
                                            className={"btn btn-success btn-block"}
                                        >Create your book!</button>
                                        : <button
                                            type="submit"
                                            className="btn btn-success btn-block"
                                        >Edit your book!</button>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default CreateBook