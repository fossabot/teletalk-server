const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const chatModels = models.native.chat;

const messageIdSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(chatModels.messageId, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .run();
};

module.exports = {
  messageIdSuccessTest,
};
