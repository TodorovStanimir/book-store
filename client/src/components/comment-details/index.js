import React, { useContext } from 'react';
import styles from './index.module.css';
import { UserContext } from '../../Context';

const CommentDetails = ({ book, deleteComment }) => {

    const userContext = useContext(UserContext)

    return (
        <div>
            {book && book.comments.length
                ? (book.comments.map(comment => <article key={comment._id} className={styles.comments}>
                    <div className={styles['comment-container']}>
                        <p>{comment.subject}</p>
                        <div className={styles['author-comment']}>
                            <p>{comment.creator.username}</p>
                            {comment.creator._id === userContext.user._id
                                ? <div className={styles.black}>
                                    <button
                                        className={styles['button-user']}
                                        onClick={() => deleteComment(comment._id, book)}
                                    >
                                        <i className="fa fa-trash-alt"></i>
                                    </button>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </article >))
                : null
            }
        </div >
    )
}

export default CommentDetails;