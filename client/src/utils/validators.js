module.exports = {
    emailValidator: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    usernameValidator: /(^[А-Я]{1}[а-я]+[ ]{1}[А-Я]{1}[а-я]+$)|(^[A-Z][a-z]+\s[A-Z][a-z]+$)/,
    phoneValidator: /^[+]{1}\d{10,}$/,
    occupationValidator: /(^[A-Za-z ]+$)|(^[А-Яа-я ]+$)/,
    passwordValidator: /(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$)|(^(?=.*[А-Яа-я])(?=.*\d)[А-Яа-я\d]{3,16}$)/,
    imageUrlValidator: /^(https:\/\/|http:\/\/).+/,
    titleValidator: /^[\w\W]{2,}$/,
    authorValidator: /^[\w\W]{5,}$/,
    descriptionValidator: /^[\w\W]{40,}$/,
    genresValidator: /^[\w\W]{2,}$/,
    yearValidator: /^[1-2]{1}[0-9]{1}[0-9]{1}[0-9]{1}$/,
    publisherValidator: /^[\w\W]{6,}$/,
    priceValidator: /^[+]?\d+(\.\d{1,2})?$/,
    messageValidator: /^[\w\W]{20,}$/,
}

