import en from '../languages/en';
import bg from '../languages/bg';

const languages = {
    en,
    bg
};

let defaultLanguage = window.navigator.language === 'en' ? 'en' : 'bg';


window.i18nData = languages[defaultLanguage];

window.i18n = (key, params) => {
    if (params || params === 0) {
        let i18nKey = window.i18nData[key];

        if (typeof params !== 'object') {
            i18nKey = i18nKey.replace('{0}', params);
        } else {
            for (let i = 0; i < params.length; i++) {
                i18nKey = i18nKey.replace(`{${i}}`, params[i]);
            }
        }

        return i18nKey;
    } else {
        return window.i18nData[key];
    }
};

window.changeLanguage = (lang) => {
    window.i18nData = languages[lang];
}