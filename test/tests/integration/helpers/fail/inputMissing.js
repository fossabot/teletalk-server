const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { errors } = require("@/variables/errors");

const inputMissingFailTest = (configuredRequester, data = {}) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.INPUT_FIELDS_MISSING,
        configuredRequester.getRoute()
      ),
    async () => {
      const copyData = { ...data };
      const firstKey = Object.keys(copyData).at(0);
      delete copyData[firstKey];
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errors.INPUT_FIELDS_MISSING,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

module.exports = { inputMissingFailTest };
