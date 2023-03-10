const { envManager } = require("@/classes/EnvironmentManager");

//TODO Rename
class CommonUtilities {
  controllerErrorResponse(error, res) {
    res.errorCollector(error);
    res.errorResponser();
  }

  controllerSuccessResponse({ requiredFieldsIndex, ...data } = {}, res) {
    res.checkDataAndResponse(data, requiredFieldsIndex);
  }

  isProduction() {
    const NODE_ENV = envManager.getNodeEnv();
    const nodeEnvValues = envManager.getNodeEnvValues();
    return (
      NODE_ENV === nodeEnvValues.production ||
      NODE_ENV === nodeEnvValues.production_local
    );
  }

  // isTest() {
  //   const serverNodeEnvValue = envManager.getNodeEnv();
  //   const { test_development, test_production } = envManager.getNodeEnvValues();
  //   return [test_development, test_production].includes(serverNodeEnvValue);
  // }
}

const commonUtilities = new CommonUtilities();

module.exports = {
  commonUtilities,
  CommonUtilities,
};
