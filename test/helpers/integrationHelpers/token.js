const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const { models } = require("@/models/models");

const { validators } = require("@/validators/validators");

const userModels = models.native.user;

const tokenSuccessTests = async (
  { tokenTest, secret } = {},
  { verifyToken = true, modelCheck = true } = {
    verifyToken: true,
    modelCheck: true,
  }
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(userModels.token, "", tokenTest)
    .setOptions({ modelCheck });

  //TODO Add min/max length to token model
  ts.typeCheck().gtCheck(100);

  (
    await ts.checkAndExecuteAsync(verifyToken, async () => {
      //BUG token verifier weird bug, i don't know what it is (invalid signature)
      const verifiedToken = await validators.token(tokenTest, secret);
      ts.customTypeCheck(verifiedToken, "object")
        .customTypeCheck(verifiedToken.signature, "string")
        .customTypeCheck(verifiedToken.payload, "object");
    })
  ).execute();
};

module.exports = {
  // tokenFailureTests,
  tokenSuccessTests,
};