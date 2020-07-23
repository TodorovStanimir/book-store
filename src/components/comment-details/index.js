import React from 'react';

import styles from './index.module.css';

// import comments from '../../comments.json';

const CommentDetails = ({ book, creatorId }) => {

    const deleteComment = (commentId) => {
        //to implement delete comment
        console.log(`delete comment ${commentId}`);
    }

    return (
        <div>
            {book && book.comments.length
                ? (book.comments.map(comment => <article key={comment._id} className={styles.comments}>
                    <div className={styles['comment-container']}>
                        <p>{comment.subject}</p>
                        <div className={styles['author-comment']}>
                            <p>{comment.creator.username}</p>
                            {comment.creator._id === creatorId
                                ? <div className={styles.black}>
                                    <button
                                        className={styles['button-user']}
                                        onClick={() => deleteComment(comment._id)}
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