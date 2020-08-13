import React from 'react';

import styles from './index.module.css';

const InputPasswordEl = (props) => {
    const {
        classNameDivEl,
        classNameIEl,
        type,
        step,
        name,
        placeholder,
        isValid,
        value,
        onChange,
        showHidePassword
    } = props;

    return (
        <div className={styles[`${classNameDivEl}`]}>
            <div className="input-group-prepend" onClick={()=>showHidePassword()}>
                <span className={styles[`${isValid ? 'span-el-valid' : 'span-el-invalid'}`]}>
                    <i className={type==='password' ? `${classNameIEl}` : 'fas fa-eye-slash'}></i>
                </span>
            </div>
            <input
                type={type ? type : "text"}
                step={step ? step : null}
                className={isValid ? styles.valid : styles.invalid}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e)}
            />
        </div>
    )
}

export default InputPasswordEl