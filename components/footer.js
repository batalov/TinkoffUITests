const I = require('../steps_file')();

module.exports = {

    //locators
    paymentsTab() {
        return locate('a').withText('Платежи').locator;
    }

};
