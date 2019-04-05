# UI Tests With Codeceptjs For Tinkoff Website

## Dependency Installation
    npm install codeceptjs webdriverio

## Project Structure
    components: directory with small reusable page components (like header, footer etc.)
    output: directory with screenshot output
    pages: page objects, incapsulating locators and usefull methods for specific page
    testData: data needed for some tests
    tests: directory with tests located in
    
    codecept.conf.js: config for codecept lib
    steps_file.js: file to extend actor (I in tests)

## Running Test
    npx codeceptjs run --steps  // to run all tests
    npx codeceptjs run --steps ./tests/testName.js // to run specific test
