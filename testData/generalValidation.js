module.exports = {
    string: "testString",
    float: 3.14,
    negativeFloat: -55.300,
    positiveInteger: 405,
    negativeInteger: -5,
    zero: 0,
    longPositiveNumber: 87432465239579982435875,
    longNegativeNumber: -87432465239579982435875,
    null: "null",
    undefined: "undefined",
    NaN: "NaN",
    infinity: "Infinity",
    negativeInfinity: "-Infinity",
    object: "{ test: 'object' }",
    jsCode: "alert('This is not supposed to happen')",
    incorrectDateFormat: "37.7",
    westernDateFormat: "2012.12.26",
    backwardDateFormat: "2012.04.05",
    correctDateInPast: "03.2014",
    correctDateInFuture: "07.2025",
    currentDate: () => {
        const date = new Date();
        let dateString = `${date.getMonth() + 1}.${date.getFullYear()}`;
        if (date.getMonth() < 10) {
            dateString = `0${dateString}`;
        }
        return dateString
    }
};
