const expect = require('chai').expect;

Feature('UserAppInteraction');

Scenario('test user app interaction Main/Footer/Payments/Utilities/ZHKU-Moskva',
    async (I, mainPage, footer, paymentsPage, utilitiesPage, zhkuMoskvaPage) => {

        //I visit main page
        I.amOnPage(mainPage.url);

        //I move to utilities page through footer -> payments page
        I.clickOn(footer.paymentsTab());
        I.clickOn(paymentsPage.utilitiesTab());

        //I make sure Moscow is selected
        await utilitiesPage.makeSureCorrectCitySelected('Москва');

        //I save provider name
        const initialProvider = await utilitiesPage.getFirstProviderName();
        I.clickOn(utilitiesPage.firstUtilityProvider());

        //I move to Zhku Moskva page
        I.clickOn(zhkuMoskvaPage.payZhkuMoskva());

        //I make sure it's a Zhku Moskva page
        await zhkuMoskvaPage.isCurrentPage();

        //I check values and errors for pay form input fields
        await zhkuMoskvaPage.validateFormInputFields();
        await zhkuMoskvaPage.checkErrorMessagesForPayForm();

        //I move to payments page and look for Zhku Moskva provider in search bar
        I.clickOn(footer.paymentsTab());
        I.fillFieldIn(paymentsPage.quickSearchBar(), initialProvider);


        //I make sure first provider is Zhku Moskva
        const firstSuggestElement = await paymentsPage.getFirstSuggestElementValue();
        expect(firstSuggestElement).to.equal(initialProvider);

        //I click on first suggest element
        I.clickOn(paymentsPage.suggestElementAtPosition(1));

        //I make sure i'm on Zhku Moskva page
        await zhkuMoskvaPage.isCurrentPage();

        //I move to utilities page
        I.clickOn(footer.paymentsTab());
        paymentsPage.waitForPageLoad();
        I.clickOn(paymentsPage.utilitiesTab());

        //I select SPB city
        await utilitiesPage.selectCity('Санкт-Петербург');

        //I fill in Zhku Moskva provider
        I.fillFieldIn(utilitiesPage.quickSearchBar(), initialProvider);
        utilitiesPage.waitForSuggestResultsLoad();

        //I don't expect to see Zhku Moskva provider in suggest results
        I.dontSee(initialProvider);
    });
