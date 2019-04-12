import React from 'react';

class Localizer {

    constructor(translations, langCode = "", defaultLang = "") {

        this.defaultLang = (defaultLang === "") ? "tr" : defaultLang;
        this.AddTranslation(translations);
        this.lang = (langCode === "") ? this.GetSelectedLang() : langCode;
    }

    AddTranslation(translations) {

        if (this.isArray(translations)) {

            var mergedTranslations = {};

            translations.forEach(element => {
                Object.assign(mergedTranslations, element);
            });

            this.translations = mergedTranslations;
        }
        else if (translations) {
            this.translations = translations;
        }
    }

    isArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    SetActiveLag(langCode = "") {
        this.lang = langCode;
        window.localStorage.setItem("lang", this.lang);
    }

    GetUrlLang() {

        let currentUrl = window.location.href.split('/');
        let lang = "";

        if (currentUrl.length >= 3) {
            lang = currentUrl[3] !== undefined && currentUrl[3].length === 2 ? currentUrl[3] : lang;
        }

        if (lang === "" && currentUrl.length >= 4) {
            lang = currentUrl[4] !== undefined && currentUrl[4].length === 2 ? currentUrl[4] : lang;
        }

        if (lang === "" && currentUrl.length >= 5) {
            lang = currentUrl[5] !== undefined && currentUrl[5].length === 2 ? currentUrl[5] : lang;
        }

        return lang;
    }

    getReplaceUrlForLang(newLangCode) {

        let newUrl = null;
        let urlLang = this.GetUrlLang();

        if (urlLang !== "" && newLangCode !== urlLang) {
            newUrl = window.location.href;
            newUrl = newUrl.replace(`/${urlLang}/`, `/${newLangCode}/`)
            newUrl = newUrl.replace(`/${urlLang}`, `/${newLangCode}`)
        }

        if (urlLang == "") {
            console.log(window.location);
            var newPathName = window.location.pathname == "/" ? '' : window.location.pathname;
            newUrl = `${window.location.protocol}//${window.location.host}/${newLangCode}/${newPathName}`;
        }

        return newUrl;
    }

    GetSelectedLang() {


        let lang = this.GetUrlLang();

        if (lang === "" && window.localStorage.getItem("lang") !== undefined) {
            lang = window.localStorage.getItem("lang");
        }

        if (lang === "") lang = this.defaultLang;

        return lang;
    }
    get(key) {
        return this.localize(key);
    }
    getWithFormat(key, dynamicTranslatedValue, variableNameInTranslationToReplace = null) {

        var translated = this.localize(key);
        //find variable in translations
        if (dynamicTranslatedValue && dynamicTranslatedValue[0] === "$") {
            dynamicTranslatedValue = dynamicTranslatedValue.substr(1, dynamicTranslatedValue.length - 1);
            dynamicTranslatedValue = this.localize(dynamicTranslatedValue);
        }

        //if translated text value has any key inside
        if (variableNameInTranslationToReplace && variableNameInTranslationToReplace) {
            translated = translated.replace("[" + variableNameInTranslationToReplace.replace("[", "").replace("]", "") + "]", dynamicTranslatedValue);
        } else if (translated.indexOf("[") > -1 && translated.indexOf("]") > -1) {

            var firstIndexOpen = translated.indexOf("[");
            var firstIndexClose = translated.indexOf("]");

            var keyName = translated.substr(firstIndexOpen, firstIndexClose - firstIndexOpen + 1);
            translated = translated.replace(keyName, dynamicTranslatedValue);
        }

        return translated;
    }
    localize(keyName) {

        var translated = keyName;

        if (keyName === null || keyName === undefined) throw ("key cannot be null or undefied");
        if (this.translations === null || this.translations === undefined) throw ("translations are null please try to add translation firt");

        var errorOnKeyFind = false;
        try {
            translated = this.translations[keyName][this.lang];
        } catch (error) {
            errorOnKeyFind = true;
        }

        if (errorOnKeyFind) {

            translated = this.findByTranslatedText(keyName)
        }

        return translated;
    }

    //it tries to find by value of translation and gets the key in another lang
    findByTranslatedText(keyName) {

        var translated = keyName;

        try {
            var translationsEntries = Object.entries(this.translations);

            translationsEntries.forEach(([key, value]) => {

                var allLangs = Object.entries(value).map((vl) => vl[0]);

                allLangs.forEach(lng => {

                    if (value[lng] == keyName) {
                        //console.log("translation found in lang translation:", value[lng], " key:", key, " lang:", lng);

                        //Requires translation
                        if (lng != this.lang) {

                            translated = value[this.lang];
                        }
                    }
                });

            });
        } catch (error) {

        }

        return translated;
    }

}


class Localize extends React.Component {

    constructor() {
        super()
    }

    render() {


        return (
            <React.Fragment key={this.props.children}>
                {!this.props.dynamic && this.props.localizer.get(this.props.children)}
                {this.props.dynamic && !this.props.variableKey && this.props.localizer.getWithFormat(this.props.children, this.props.dynamic)}
                {this.props.variableKey && this.props.dynamic && this.props.localizer.getWithFormat(this.props.children, this.props.dynamic, this.props.variableKey)}
            </React.Fragment>
        )
    }
}

export default Localizer

export { Localizer, Localize }