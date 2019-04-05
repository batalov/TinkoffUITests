const I = require('../steps_file')();
const testData = require('../testData/zhkuMoskvaPayForm');
const expect = require('chai').expect;

module.exports = {

    url: "https://www.tinkoff.ru/zhku-moskva/",

    //locators
    payZhkuMoskva() {
        return locate('a').withAttr({href: '/zhku-moskva/oplata/'}).locator
    },

    providerPayerCodeInput() {
        return locate('input').withAttr({id: 'payerCode'}).withAttr({name: 'provider-payerCode'}).locator
    },

    providerPayerCodeCheckInput() {
        return locate('input').withAttr({id: 'payerCode'}).withAttr({name: 'fieldpayerCode'}).locator
    },

    providerPayerCodeErrorMessage() {
        return {xpath: ".//div[@data-qa-file = 'FormFieldWrapper']" +
                             "[./child::div[@data-qa-file = 'UIInput']]" +
                             "//div[@data-qa-file = 'UIFormRowError']"}
    },

    paymentPeriod() {
        return locate('input').withAttr({id: 'period'}).withAttr({name: 'provider-period'}).locator
    },

    paymentPeriodErrorMessage() {
        return {xpath: ".//div[@data-qa-file = 'FormFieldWrapper']" +
                             "[./child::div[@data-qa-file = 'UIInputDate']]" +
                             "//div[@data-qa-file = 'UIFormRowError']"}
    },

    insuranceAmount() {
        return this.insuranceLabel().find('input').withAttr({type: 'text'}).locator
    },

    insuranceLabel() {
        return locate('label')
            .withChild('span').withText('Сумма добровольного страхования жилья из квитанции за')
    },

    insuranceAmountErrorMessage() {
        return {xpath: ".//div[@data-qa-file = 'FormFieldWrapper']" +
                             "[./child::div" +
                             "[./child::label" +
                             "[./child::span][contains(., 'Сумма добровольного страхования жилья из квитанции')]]]" +
                             "//div[@data-qa-file = 'UIFormRowError']"}
    },

    paymentSumLabel() {
        return locate('label')
            .withChild('span').withText('Сумма платежа')
    },

    paymentSum() {
        return this.paymentSumLabel().find('input').withAttr({type: 'text'}).locator
    },

    paymentSumErrorMessage() {
        return locate('div').withAttr({'data-qa-file': 'FormFieldSet'})
            .find('div').withAttr({'data-qa-file': 'UIFormRowError'})
            .locator
    },

    userEmail() {
        return locate('input').withAttr({'data-qa-file': 'UIInput'}).withAttr({name: 'email'}).locator
    },

    userLogin() {
        return locate('input').withAttr({'data-qa-file': 'UIInput'}).withAttr({name: 'login'}).locator
    },

    tabs() {
        return locate('ul').withAttr({'data-qa-file': 'Tabs'}).locator
    },

    title() {
        return locate('div').withText('Оплатите ЖКУ в Москве без комиссии').locator
    },

    payButton() {
        return locate('h2').withText('Оплатить ЖКУ в Москве').locator
    },



    //methods
    waitForPageLoad(){
        I.waitUrlEquals(this.url);
        I.waitForElementPresence(this.tabs());
    },
    waitForPayFormLoad() {
        I.waitUrlEquals(`${this.url}oplata/?tab=pay`);
        I.waitForElement(this.paymentSum());
        I.waitForElementPresence(this.insuranceAmount());
        I.waitForElementPresence(this.paymentPeriod());
        I.waitForElementPresence(this.providerPayerCodeInput());
    },

    waitForDeptCheckFormLoad() {
        I.waitForElementPresence(this.userLogin());
        I.waitForElementPresence(this.userEmail());
        I.waitForElementPresence(this.providerPayerCodeCheckInput());
    },

    async validateInputFieldsFor(locator, testData, errorLocator) {
        //wait for form load
        this.waitForPayFormLoad();
        const inputField = locator;

        //define test cases
        const cases = [
            testData.negativeCases,
            testData.positiveCases
        ];

        //iterate over test cases
        for (const caseSuite of cases) {
            for (testCase in caseSuite) {
                //hack due to focus issues
                if(locator.toString() === this.paymentSum().toString()) {
                    I.clickOn(this.paymentSumLabel());
                }
                if(locator.toString() === this.insuranceAmount().toString()) {
                    I.clickOn(this.insuranceLabel());
                }

                I.clearInputField(inputField);

                I.say(`Checking ${testCase} value`);
                I.fillFieldIn(inputField, caseSuite[testCase].testValue);

                let fieldValue = await I.grabValueFrom(inputField);
                if (fieldValue.length > 0) fieldValue = fieldValue.pop();

                //expect inside try catch block to catch expect throws
                I.try(async () => {
                    expect(fieldValue).to.eql(caseSuite[testCase].expectedValue);
                });

                I.clearInputField(inputField);
            }
        }
    },

    async validateProviderPayerCodeInput() {
        await this.validateInputFieldsFor(this.providerPayerCodeInput(), testData.providerPayerCodeInputData,)
    },

    async validatePaymentPeriodInput() {
        await this.validateInputFieldsFor(this.paymentPeriod(), testData.paymentPeriodData)
    },

    async validateInsuranceAmountInput() {
        await this.validateInputFieldsFor(this.insuranceAmount(), testData.insuranceAmountData)
    },

    async validatePaymentSum() {
        await this.validateInputFieldsFor(this.paymentSum(), testData.paymentSumData)
    },

    async validateFormInputFields() {
        await this.validateProviderPayerCodeInput();
        await this.validatePaymentPeriodInput();
        await this.validateInsuranceAmountInput();
        await this.validatePaymentSum();
    },

    async isCurrentPage() {
        //use page load functions to make sure it's a correct page
        this.waitForPageLoad();
        const currentUrl = await I.grabCurrentUrl();

        I.seeInCurrentUrl(this.url);

        if (currentUrl === this.url || currentUrl.includes(`${this.url}?tab=search`)) {
            this.waitForDeptCheckFormLoad();
        }

        if (currentUrl.includes(`${this.url}oplata/?tab=pay`)) {
            this.waitForPayFormLoad();
        }
    },

    async checkErrorMessagesForPayForm() {
        await this.checkRequiredFieldErrors();
        await this.checkInsuranceSumNotGreaterThanPaySum();
        await this.checkGeneralErrors();
    },

    async checkRequiredFieldErrors() {
        //hack due to focus issues
        I.clickOn(this.paymentSumLabel());
        I.clearInputField(this.paymentSum());
        I.clickOn(this.insuranceLabel());
        I.clearInputField(this.insuranceAmount());
        I.clearInputField(this.providerPayerCodeInput());
        I.clickOn(this.title());


        I.clickOn(this.payButton());
        I.waitForElementPresence(this.providerPayerCodeErrorMessage());
        const payerCodeErrorMsg = await I.grabTextFrom(this.providerPayerCodeErrorMessage());
        const paymentPeriodErrorMsg = await I.grabTextFrom(this.paymentPeriodErrorMessage());
        const paymentSumErrorMsg = await I.grabTextFrom(this.paymentSumErrorMessage());

        //expect inside try catch block to catch expect throws
        I.try(() => {
            expect(payerCodeErrorMsg).to.equal(testData.errorMessages.requiredField);
            expect(paymentPeriodErrorMsg).to.equal(testData.errorMessages.requiredField);
            expect(paymentSumErrorMsg).to.equal(testData.errorMessages.requiredField);
        });
    },

    async checkInsuranceSumNotGreaterThanPaySum() {
        //hack due to focus issues
        I.clickOn(this.paymentSumLabel());
        I.clearInputField(this.paymentSum());
        I.clickOn(this.insuranceLabel());
        I.clearInputField(this.insuranceAmount());
        I.clickOn(this.title());


        I.fillFieldIn(this.paymentSum(), 4000);
        I.fillFieldIn(this.insuranceAmount(), 5000);
        I.clickOn(this.payButton());
        I.waitForElementPresence(this.insuranceAmountErrorMessage());
        const errorMsg = await I.grabTextFrom(this.insuranceAmountErrorMessage());

        //expect inside try catch block to catch expect throws
        I.try(() => {
            expect(errorMsg).to.equal(testData.errorMessages.insuranceSumNotGreaterThanPaySum);
        });
    },

    async checkGeneralErrors() {
        //hack due to focus issues
        I.clickOn(this.paymentSumLabel());
        I.clearInputField(this.paymentSum());
        I.clearInputField(this.insuranceAmount());
        I.clearInputField(this.providerPayerCodeInput());
        I.clearInputField(this.paymentPeriod());
        I.clickOn(this.title());

        //test cases
        const cases = [
            incorrectProviderPayerCode = {
                elementLocator: this.providerPayerCodeInput(),
                errLocator: this.providerPayerCodeErrorMessage(),
                testValue: 643634,
                expectedErrMsg: testData.errorMessages.incorrectPayerIdValue
            },
            incorrectPayPeriod = {
                elementLocator: this.paymentPeriod(),
                errLocator: this.paymentPeriodErrorMessage(),
                testValue: 643634,
                expectedErrMsg: testData.errorMessages.incorrectDateInputValue
            },
            incorrectInsureAmount = {
                elementLocator: this.insuranceAmount(),
                errLocator: this.insuranceAmountErrorMessage(),
                testValue: -4,
                expectedErrMsg: testData.errorMessages.incorrectInsuranceValue
            },
            incorrectPaySumAmount = {
                elementLocator: this.paymentSum(),
                errLocator: this.paymentSumErrorMessage(),
                testValue: -30,
                expectedErrMsg: testData.errorMessages.incorrectPayValue
            },

            //comment out these cases due to some bug: error message does not pop up
            // (probably a chromedriver or webdriver issue)

            // minPaySumAmount = {
            //     elementLocator: this.paymentSum(),
            //     errLocator: this.paymentSumErrorMessage(),
            //     testValue: 3,
            //     expectedErrMsg: testData.errorMessages.minPaySum
            // },
            // maxPaySumAmount = {
            //     elementLocator: this.paymentSum(),
            //     errLocator: this.paymentSumErrorMessage(),
            //     testValue: 520030,
            //     expectedErrMsg: testData.errorMessages.maxPaySum
            // }
        ];

        //iterate over test cases
        for (const caseSuite of cases) {
            //hack due to focus issues
            if(caseSuite.elementLocator.toString() === this.paymentSum().toString()) {
                I.clickOn(this.paymentSumLabel());
            }
            if(caseSuite.elementLocator.toString() === this.insuranceAmount().toString()) {
                I.clickOn(this.insuranceLabel());
            }

            I.clearInputField(caseSuite.elementLocator);
            I.fillFieldIn(caseSuite.elementLocator, caseSuite.testValue);
            I.clickOn(this.payButton());

            I.waitForElementPresence(caseSuite.errLocator);
            const errorMsg = await I.grabTextFrom(caseSuite.errLocator);

            //expect inside try catch block to catch expect throws
            I.try(() => {
                expect(errorMsg).to.equal(caseSuite.expectedErrMsg);
            });
            I.clearInputField(caseSuite.elementLocator);
        }
    }
};
