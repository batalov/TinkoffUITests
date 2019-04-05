const I = require('../steps_file')();

module.exports = {

    url: "https://www.tinkoff.ru/payments/categories/kommunalnie-platezhi/",

    //locators
    cityName() {
        return locate('span')
                    .inside('span').withAttr({role: 'button'}).withAttr({'data-qa-file': 'PaymentsCatalogHeader'})
                    .locator
    },

    regionSelectionSearchBar() {
        return locate('input').withAttr({'data-qa-file': 'UIInput'}).locator
    },

    getRegion(region) {
        return locate('span').withAttr({'data-qa-file': 'UILink'}).withText(region).locator
    },

    utilityProvidersList() {
        return locate('ul').withAttr({'data-qa-file': 'UIScrollList'})
    },

    firstUtilityProvider() {
        return this.utilityProvidersList().find('li').withAttr({'data-qa-type': 'payments/providersMenuItem'}).first()
                                            .find('span').withAttr({role: 'heading'})
                                            .locator;
    },

    quickSearchBar() {
        return locate('input').withAttr({type: 'text'}).withAttr({'data-qa-file': 'SearchInput'}).locator
    },

    suggestBlock() {
        return locate('div').withAttr({'data-qa-file': 'SuggestBlock'}).locator
    },


    //methods
    async getCityName() {
        const cityName = this.cityName();
        I.waitForElementPresence(cityName);
        return await I.grabTextFrom(cityName)
    },

    async selectCity(cityName) {
        const cityFromPage = await this.getCityName();
        const normalizedCityName = cityName.slice(0, cityName.length - 1);

        if (cityFromPage.includes(normalizedCityName)) { return }

        I.clickOn(this.cityName());
        I.fillFieldIn(this.regionSelectionSearchBar(), normalizedCityName);

        I.clickOn(this.getRegion(cityName));
    },

     async makeSureCorrectCitySelected(cityName) {
         await this.selectCity(cityName);
    },

    async getFirstProviderName() {
        const firstProvider = this.firstUtilityProvider();
        I.waitForElementPresence(firstProvider);
        return await I.grabTextFrom(firstProvider);
    },

    waitForSuggestResultsLoad() {
        I.waitForElementPresence(this.suggestBlock());
    }
};
