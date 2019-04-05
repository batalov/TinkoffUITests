const I = require('../steps_file')();

module.exports = {

    url: "https://www.tinkoff.ru/payments/",

    //locators
    utilitiesTab() {
        return locate('a').withAttr({href: '/payments/categories/kommunalnie-platezhi/'}).locator
    },

    quickSearchBar() {
        return locate('input').withAttr({type: 'text'}).withAttr({'data-qa-file': 'SearchInput'}).locator
    },

    suggestElements() {
        return {"xpath": "(.//div[@data-qa-file = 'SuggestEntry']" +
                            "//div[@data-qa-file = 'Text'])"}
    },



    //methods
    suggestElementAtPosition(position) {
        let suggestElements = this.suggestElements();
        suggestElements.xpath = `${suggestElements.xpath}[${position}]`;
        return suggestElements
    },

    async getFirstSuggestElementValue() {
        const suggestElement = this.suggestElementAtPosition(1);
        I.waitForElementPresence(suggestElement);
        return await I.grabTextFrom(suggestElement);
    },
    waitForPageLoad() {
        I.waitUrlEquals(this.url);
        I.waitForElementPresence(this.utilitiesTab());
        I.waitForElementPresence(this.quickSearchBar());
    }


};
