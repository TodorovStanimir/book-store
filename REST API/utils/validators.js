const { body } = require('express-validator');

const bookValidator = [
    body('title')
        .isLength({ min: 2 }).withMessage('Title shoud contain at least 2 signs')
    ,
    body('author')
        .isLength({ min: 5 }).withMessage('Title shoud contain at least 5 signs')
    ,
    body('description')
        .isLength({ min: 40 }).withMessage('Title shoud contain at least 40 signs')
    ,
    body('genres')
        .isLength({ min: 3 }).withMessage('Genres should contain at least 3 signs')
    ,
    body('year')
        .custom((value, { req }) => {
            if (!/^\d{4}$/g.test(value)) {
                throw new Error('Year should contain exactly 4 digits!');
            }
            return true;
        })
    ,
    body('publisher')
        .isLength(4).withMessage('Publishers should contain at least {0} signs')
    ,
    body('price')
        .isFloat({ min: 0.01 }).withMessage('Price should be at least 0.01')
    ,
    body('imageUrl')
        .custom((value, { req }) => {
            if (!/^(https|http){1}[\w\W]+$/gi.test(value)) {
                throw new Error(`ImageUrl should starts with http or https.`);
            }
            return true;
        })
];

const userValidator = [

    body('username')
        .custom((value, { req }) => {
            if (!/(^[А-Я]{1}[а-я]+[ ]{1}[А-Я]{1}[а-я]+$)|(^[A-Z][a-z]+\s[A-Z][a-z]+$)/g.test(value)) {
                throw new Error('Shoud be in format Xxxxx Xxxxx');
            }
            return true;
        })
    ,
    body('email')
        .isEmail().withMessage('Email shoud be a valid email address, like example@example.extension!')
    ,

    body('password')
        .custom((value, { req }) => {
            if (!/(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$)|(^(?=.*[А-Яа-я])(?=.*\d)[А-Яа-я\d]{3,16}$)/g.test(value)) {
                throw new Error('Password shoud consists between 3 and 16 symbols: letters and digits!');
            }
            return true;
        })
        .isAlphanumeric().withMessage('The password should be at least 3 and consist only english letters and digits.')
        .isLength({ min: 3 }).withMessage('The password should be at least 3 and consist only english letters and digits.')
    ,

    body('phone')
        .custom((value, { req }) => {
            if (!/^[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]+$/g.test(value)) {
                throw new Error('Phone number should consists country code and at least 7 digits!');
            }
            return true;
        })
    ,

    body('occupation')
        .custom((value, { rew }) => {
            if (!/(^[A-Za-z ]+$)|(^[А-Яа-я ]+$)/g.test(value)) {
                throw new Error('Occupation field should consists only letters!')
            }
        })
    ,

    body('imageUrl')
        .custom((value, { req }) => {
            if (!/^(https|http){1}[\w\W]+$/gi.test(value)) {
                throw new Error(`ImageUrl should starts with http or https.`);
            }
            return true;
        })
];

module.exports = {
    bookValidator,
    userValidator
};