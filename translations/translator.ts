// import * as RNLocalize from 'react-native-localize';

type Translations = {
    [key: string]: string;
};

export const t = (key: string): string => {
    // const deviceLanguage: string = RNLocalize.getLocales()[0].languageCode;
    const deviceLanguage: string = "es";
    let translations: Translations;
    switch (deviceLanguage) {
        case 'es':
            translations = require('./languages/es.json');
            break;

        default:
            translations = require('./languages/en.json');
            break;
    }

    return translations[key] || key;
};
