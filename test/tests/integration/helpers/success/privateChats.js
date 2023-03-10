const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const chatModels = models.native.chat;

const privateChatsSuccessTest = (
  { testValue },
  { modelCheck = true } = {
    modelCheck: true,
  }
) => {
  const builder = successTestBuilder
    .create()
    .setModel(chatModels.privateChats)
    .setTestValue(testValue)
    .setOptions({ modelCheck });

  builder.typeCheck().run();

  testValue.forEach((privateChat) => {
    builder
      .customTypeCheck(privateChat, FIELD_TYPE.OBJECT)
      //TODO: Add all parts
      .setModel(chatModels.chatId)
      .setTestValue(privateChat.chatId)
      .typeCheck()
      .gteCheck()
      .lteCheck()
      .run();
  });
};

module.exports = { privateChatsSuccessTest };
