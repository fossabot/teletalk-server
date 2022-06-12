const { request } = require("@/functions/utilities/testUtils");
const { envManager } = require("@/classes/EnvironmentManager");

class CustomRequest {
  constructor() {
    this.routeObject = {};
    this.baseUrl = {};
    this.data = {};
    this.errorObject = {};
    this.options = { token: "", filterDataCondition: true };
  }

  setRouteObject(routeObject) {
    this.routeObject = routeObject;

    return this;
  }
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;

    return this;
  }

  setRequestRequirements(baseUrl, routeObject, options = this.options) {
    this.setBaseUrl(baseUrl);
    this.setRouteObject(routeObject);
    this.setOptions({ ...this.options, ...options });
  }

  sendRequest(
    data,
    errorObject,
    options = this.options,
    baseUrl = this.baseUrl,
    routeObject = this.routeObject
  ) {
    const allOptions = {
      ...this.options,
      ...options,
    };

    return request(baseUrl, routeObject, data, errorObject, allOptions);
  }

  getToken() {
    return this.options.token;
  }
  setToken(token) {
    this.setOptions({ token });
  }
  setMainTokenByUserObject(user) {
    this.setOptions({ token: user.tokens[0].mainToken });
  }
  setVerifyTokenFromEnv() {
    const token = envManager.getTestVerifyToken();
    this.setOptions({ token });
  }

  getOptions() {
    return this.options;
  }
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };

    return this;
  }
}

module.exports = {
  customRequest: new CustomRequest(),
  CustomRequest,
};