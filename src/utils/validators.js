module.exports = {
    emailValidator: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    usernameValidator: /(^[А-Я]{1}[а-я]+[ ]{1}[А-Я]{1}[а-я]+$)|(^[A-Z][a-z]+\s[A-Z][a-z]+$)/,
    phoneValidator: /^[+]{1}\d{10,}$/,
    occupationValidator: /(^[A-Za-z ]+$)|(^[А-Яа-я ]+$)/,
    passwordValidator: /(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$)|(^(?=.*[А-Яа-я])(?=.*\d)[А-Яа-я\d]{3,16}$)/,
    imageUrlValidator: /^(https:\/\/|http:\/\/).+/
}

