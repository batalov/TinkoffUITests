const recorder = require('codeceptjs').recorder;

module.exports = function() {
  return actor({

    //most methods wrap classic ones to provide wait mechanism, which waits for element presence both in DOM & visibly
    waitForElementPresence: function(locator) {
      this.waitForElement(locator);
      this.waitForVisible(locator);
    },

    clickOn: function(locator) {
      this.waitForElementPresence(locator);
      this.scrollTo(locator, 5, 5);
      this.click(locator);
    },

    doubleClickOn: function(locator) {
      this.waitForElementPresence(locator);
      this.doubleClick(locator);
    },

    fillFieldIn: function(locator, value) {
      this.waitForElementPresence(locator);
      this.fillField(locator, value);
    },

    clearInputField: async function (locator) {
      this.say('Clearing out input field');
      this.scrollTo(locator, 5, 5);
      this.clickOn(locator);
      this.doubleClickOn(locator);
      this.pressKey('Alt');
      this.pressKey('KeyA');
      this.pressKey('Alt');
      this.pressKey('Backspace');
    },

    //try wrap to catch expect or other throws
    try: function (callback) {
      try {
        callback();
      } catch (e) {
        recorder.throw(e);
      }
    }
  });
};
