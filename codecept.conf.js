exports.config = {
  output: './output',
  helpers: {
    WebDriver: {
      url: 'https://www.tinkoff.ru/',
      browser: 'chrome',
      desiredCapabilities: {
        chromeOptions: {
          args: ['start-fullscreen']
        }
      },
      waitForTimeout: 30000
    }
  },
  include: {
    I: './steps_file.js',
    mainPage: './pages/mainPage.js',
    footer: './components/footer.js',
    paymentsPage: './pages/payments.js',
    utilitiesPage: './pages/utilities.js',
    zhkuMoskvaPage: './pages/zhku-moskva.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: './tests/*.js',
  name: 'UITests'
};
