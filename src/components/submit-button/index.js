import React from 'react';

import styles from './index.module.css';

const SubmitButton = (props) => {
    const { btnText, disabled } = props;
    return (
        <div className="form-group">
            <button
                type="submit"
                className={styles['submit-button']}
                disabled={disabled}
            >
                {btnText}
            </button>
        </div>
    )
}

export default SubmitButton