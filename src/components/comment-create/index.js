/* global i18n */
import React, { useState } from 'react';

import styles from './index.module.css';

const CommentCreate = ({ book, createComment }) => {

    const [{ btnDisabled, subject }, setBtnDisabled] = useState(
        {
            btnDisabled: true,
            subject: ''
        });

    const onChange = (e) => {
        const subject = e.target.value;
        setBtnDisabled({
            btnDisabled: subject.length < 4,
            subject: subject
        });
    }

    const handleCreateComment = (e) => {
        e.preventDefault();
        createComment(book, subject);
        setBtnDisabled({ btnDisabled: true, subject: '' });
    }

    return (
        <div>
            {book.comments.length === 0
                ? <div className={styles['comment-header']}>
                    <p>{i18n('commentThereIsNot1')}</p>
                    <p>{i18n('commentThereIsNot2')}</p>
                </div>
                : null}
            <div className={styles['add-comment']}>
                <form>
                    <div className={styles['comment-body-items']}>
                        <textarea
                            type="text"
                            placeholder={i18n('commentSubject')}
                            name="subject"
                            value={subject}
                            onChange={onChange}
                        ></textarea>
                    </div>
                    <div className={styles.black}>
                        <button onClick={e => handleCreateComment(e)} className={styles['button-user']} disabled={btnDisabled}>
                            <i className="fa fa-save"></i>
                        </button>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default CommentCreate;