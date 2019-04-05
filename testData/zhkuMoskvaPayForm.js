const generalValidation = require('./generalValidation');
const generalErrorMsgs = {
  incorrectDateInputValue: "Поле заполнено некорректно",
  incorrectPayerIdValue: "Поле неправильно заполнено",
  incorrectInsuranceValue: "Поле заполнено неверно",
  incorrectPayValue: "Поле заполнено неверно",
  requiredField: "Поле обязательное"
};

module.exports = {
  // error messages
  errorMessages: {
    requiredField: generalErrorMsgs.requiredField,
    insuranceSumNotGreaterThanPaySum: "Сумма добровольного страхования не может быть больше итоговой суммы.",
    maxPaySum: "Максимум — 15 000 ₽",
    minPaySum: "Минимум — 10 ₽",
    incorrectDateInputValue: generalErrorMsgs.incorrectDateInputValue,
    incorrectPayerIdValue: generalErrorMsgs.incorrectPayerIdValue,
    incorrectInsuranceValue: generalErrorMsgs.incorrectInsuranceValue,
    incorrectPayValue: generalErrorMsgs.incorrectPayValue
  },


  // payer code input field checks
  providerPayerCodeInputData: {
    negativeCases: {
      string: {
        testValue: generalValidation.string,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      null: {
        testValue: generalValidation.null,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      undefined: {
        testValue: generalValidation.undefined,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      NaN: {
        testValue: generalValidation.NaN,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      infinity: {
        testValue: generalValidation.infinity,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      negativeInfinity: {
        testValue: generalValidation.negativeInfinity,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      object: {
        testValue: generalValidation.object,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      jsCode: {
        testValue: generalValidation.jsCode,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      float: {
        testValue: generalValidation.float,
        expectedValue: '314',
        expectedErrorMsg: generalErrorMsgs.incorrectPayerIdValue
      },
      negativeInteger: {
        testValue: generalValidation.negativeInteger,
        expectedValue: '5',
        expectedErrorMsg: generalErrorMsgs.incorrectPayerIdValue
      },
      positiveInteger: {
        testValue: generalValidation.positiveInteger,
        expectedValue: '405',
        expectedErrorMsg: generalErrorMsgs.incorrectPayerIdValue
      },
      negativeFloat: {
        testValue: generalValidation.negativeFloat,
        expectedValue: '553',
        expectedErrorMsg: generalErrorMsgs.incorrectPayerIdValue
      },
      zero: {
        testValue: generalValidation.zero,
        expectedValue: '0',
        expectedErrorMsg: generalErrorMsgs.incorrectPayerIdValue
      },
      longPositiveNumber: {
        testValue: generalValidation.longPositiveNumber,
        expectedValue: '8743246523'
      },
      longNegativeNumber: {
        testValue: generalValidation.longNegativeNumber,
        expectedValue: '8743246523'
      }
    },

    positiveCases: {
      correctId: {
        testValue: 5453453463,
        expectedValue: '5453453463'
      }
    }
  },


  // payment period input field checks
  paymentPeriodData: {
    negativeCases: {
      string: {
        testValue: generalValidation.string,
        expectedValue: []
      },
      null: {
        testValue: generalValidation.null,
        expectedValue: []
      },
      undefined: {
        testValue: generalValidation.undefined,
        expectedValue: []
      },
      NaN: {
        testValue: generalValidation.NaN,
        expectedValue: []
      },
      infinity: {
        testValue: generalValidation.infinity,
        expectedValue: []
      },
      negativeInfinity: {
        testValue: generalValidation.negativeInfinity,
        expectedValue: []
      },
      object: {
        testValue: generalValidation.object,
        expectedValue: []
      },
      jsCode: {
        testValue: generalValidation.jsCode,
        expectedValue: []
      },
      float: {
        testValue: generalValidation.float,
        expectedValue: '31.4',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      negativeInteger: {
        testValue: generalValidation.negativeInteger,
        expectedValue: '5',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      positiveInteger: {
        testValue: generalValidation.positiveInteger,
        expectedValue: '40.5',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      negativeFloat: {
        testValue: generalValidation.negativeFloat,
        expectedValue: "55.3",
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      zero: {
        testValue: generalValidation.zero,
        expectedValue: '0',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      longPositiveNumber: {
        testValue: generalValidation.longPositiveNumber,
        expectedValue: '87.4324',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      longNegativeNumber: {
        testValue: generalValidation.longNegativeNumber,
        expectedValue: '87.4324',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      incorrectDateFormat: {
        testValue: generalValidation.incorrectDateFormat,
        expectedValue: '37.7',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      westernDateFormat: {
        testValue: generalValidation.westernDateFormat,
        expectedValue: '20.1212',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      },
      backwardDateFormat: {
        testValue: generalValidation.backwardDateFormat,
        expectedValue: '20.1204',
        expectedErrorMsg: generalErrorMsgs.incorrectDateInputValue
      }
    },

    positiveCases: {
      correctDateInPast: {
        testValue: generalValidation.correctDateInPast,
        expectedValue: "03.2014"
      },
      correctDateInFuture: {
        testValue: generalValidation.correctDateInFuture,
        expectedValue: "07.2025"
      },
      currentDate: {
        testValue: generalValidation.currentDate(),
        expectedValue: generalValidation.currentDate()
      }
    }
  },


  // insurance pay amount input field checks
  insuranceAmountData: {
    negativeCases: {
      string: {
        testValue: generalValidation.string,
        expectedValue: []
      },
      null: {
        testValue: generalValidation.null,
        expectedValue: []
      },
      undefined: {
        testValue: generalValidation.undefined,
        expectedValue: []
      },
      NaN: {
        testValue: generalValidation.NaN,
        expectedValue: []
      },
      infinity: {
        testValue: generalValidation.infinity,
        expectedValue: []
      },
      negativeInfinity: {
        testValue: generalValidation.negativeInfinity,
        expectedValue: '-',
        expectedErrorMsg: generalErrorMsgs.incorrectInsuranceValue
      },
      object: {
        testValue: generalValidation.object,
        expectedValue: []
      },
      jsCode: {
        testValue: generalValidation.jsCode,
        expectedValue: '()',
        expectedErrorMsg: generalErrorMsgs.incorrectInsuranceValue
      },
      negativeInteger: {
        testValue: generalValidation.negativeInteger,
        expectedValue: '-5',
        expectedErrorMsg: generalErrorMsgs.incorrectInsuranceValue
      },
      negativeFloat: {
        testValue: generalValidation.negativeFloat,
        expectedValue: "-55,3",
        expectedErrorMsg: generalErrorMsgs.incorrectInsuranceValue
      },
      zero: {
        testValue: generalValidation.zero,
        expectedValue: '0'
      },
      longNegativeNumber: {
        testValue: generalValidation.longNegativeNumber,
        expectedValue: '-8,743246523957998+22',
        expectedErrorMsg: generalErrorMsgs.incorrectInsuranceValue
      },
      longPositiveNumber: {
        testValue: generalValidation.longPositiveNumber,
        expectedValue: '8,743246523957998+22',
        expectedErrorMsg: generalErrorMsgs.incorrectInsuranceValue
      }
    },

    positiveCases: {
      float: {
        testValue: generalValidation.float,
        expectedValue: '3,14'
      },
      positiveInteger: {
        testValue: generalValidation.positiveInteger,
        expectedValue: '405'
      }
    }
  },


  // payment sum amount input field checks
  paymentSumData: {
    negativeCases: {
      string: {
        testValue: generalValidation.string,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      null: {
        testValue: generalValidation.null,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      undefined: {
        testValue: generalValidation.undefined,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      NaN: {
        testValue: generalValidation.NaN,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      infinity: {
        testValue: generalValidation.infinity,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      negativeInfinity: {
        testValue: generalValidation.negativeInfinity,
        expectedValue: '-',
        expectedErrorMsg: generalErrorMsgs.incorrectPayValue
      },
      object: {
        testValue: generalValidation.object,
        expectedValue: [],
        expectedErrorMsg: generalErrorMsgs.requiredField
      },
      jsCode: {
        testValue: generalValidation.jsCode,
        expectedValue: '()',
        expectedErrorMsg: generalErrorMsgs.incorrectPayValue
      },
      negativeInteger: {
        testValue: generalValidation.negativeInteger,
        expectedValue: '-5',
        expectedErrorMsg: generalErrorMsgs.incorrectPayValue
      },
      negativeFloat: {
        testValue: generalValidation.negativeFloat,
        expectedValue: "-55,3",
        expectedErrorMsg: generalErrorMsgs.incorrectPayValue
      },
      zero: {
        testValue: generalValidation.zero,
        expectedValue: '0'
      },
      longNegativeNumber: {
        testValue: generalValidation.longNegativeNumber,
        expectedValue: '-8,743246523957998+22',
        expectedErrorMsg: generalErrorMsgs.incorrectPayValue
      },
      longPositiveNumber: {
        testValue: generalValidation.longPositiveNumber,
        expectedValue: '8,743246523957998+22',
        expectedErrorMsg: generalErrorMsgs.incorrectPayValue
      }
    },

    positiveCases: {
      float: {
        testValue: generalValidation.float,
        expectedValue: "3,14"
      },
      positiveInteger: {
        testValue: generalValidation.positiveInteger,
        expectedValue: '405'
      }
    }
  }
};
