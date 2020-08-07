import React from 'react';

import styles from './index.module.css';

const SubmitButton = ({ btnText, disabled, className }) => {

    return (
        <div className="form-group">
            <button
                type="submit"
                className={styles[`${className || 'submit-button'}`]}
                disabled={disabled}
            >
                {btnText}
            </button>
        </div>
    )
}

export default SubmitButton