const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

//CLEANME: Major refactor
class FailTestBuilder {
  constructor(configuredCustomRequest, data, model, testingPropertyName) {
    this.configuredCustomRequest = configuredCustomRequest;
    this.data = data;
    this.model = model;
    this.testingPropertyName = testingPropertyName;
  }
  setRequirements(configuredCustomRequest, model, data, testingPropertyName) {
    this.setModel(model)
      .setData(data)
      .setConfiguredCustomRequest(configuredCustomRequest)
      .setTestingPropertyName(testingPropertyName);
    return this;
  }
  setConfiguredCustomRequest(configuredCustomRequest) {
    this.configuredCustomRequest = configuredCustomRequest;
    return this;
  }
  getConfiguredCustomRequest() {
    return this.configuredCustomRequest;
  }
  setModel(model) {
    this.model = model;
    return this;
  }
  getModel() {
    return this.model;
  }

  setData(data) {
    this.data(data);
    return this;
  }
  setTestingPropertyName(testingPropertyName) {
    this.testingPropertyName = testingPropertyName;
    return this;
  }
  getTestingPropertyName() {
    return this.testingPropertyName;
  }
  getMinlength() {
    return this.model.minlength?.value;
  }
  getMaxlength() {
    return this.model.maxlength?.value;
  }
  getLength() {
    return this.model.length?.value;
  }
  dataMerger(newValue) {
    return { ...this.data, [this.testingPropertyName]: newValue };
  }

  required(errorObject) {
    const mergedData = this.dataMerger("");
    this.initTest(mergedData, errorObject);
    return this;
  }
  invalidType_typeIsString(errorObject) {
    const mergedData = this.dataMerger(
      randomMaker.randomNumber(this.getMaxlength)
    );
    this.initTest(mergedData, errorObject);
    return this;
  }
  numeric(errorObject) {
    const randomMixedString =
      randomMaker.randomString(this.getMaxlength() - 1) + "!";
    const mergedData = this.dataMerger(randomMixedString);
    this.initTest(mergedData, errorObject);
    return this;
  }
  minlength(errorObject) {
    if (this.getMinlength() > 1) {
      const randomString = randomMaker.randomStringNumber(
        this.getMinlength() - 1
      );
      const mergedData = this.dataMerger(randomString);
      this.initTest(mergedData, errorObject);
    }
    return this;
  }
  maxlength(errorObject) {
    const randomString = randomMaker.randomStringNumber(
      this.getMaxlength() + 1
    );
    const mergedData = this.dataMerger(randomString);
    this.initTest(mergedData, errorObject);
    return this;
  }
  length(errorObject) {
    const randomStringNumber = randomMaker.randomStringNumber(
      this.getLength() + 1
    );
    const mergedData = this.dataMerger(randomStringNumber);
    this.initTest(mergedData, errorObject);
    return this;
  }
  invalidNumber(errorObject) {
    const length = this.getLength() || this.getMaxlength();
    const randomStringNumber = randomMaker.randomStringNumber(length);
    const mergedData = this.dataMerger(randomStringNumber);
    this.initTest(mergedData, errorObject);
  }

  inputMissing(errorObject, requesterOptions) {
    const copyData = objectUtilities.objectShallowCopy(this.data);
    const firstKey = objectUtilities.objectKeys(copyData).at(0);
    delete copyData[firstKey];

    this.initTest(copyData, errorObject, requesterOptions);
  }

  custom(value, errorObject) {
    const mergedData = this.dataMerger(value);
    this.initTest(mergedData, errorObject);
    return this;
  }

  initTest(data, errorObject, options) {
    it(this.getDefaultTestMessage(errorObject.reason), async () => {
      await this.configuredCustomRequest.sendFullFeaturedRequest(
        data,
        errorObject,
        options
      );
    });
  }

  getDefaultTestMessage(errorName) {
    return `It should get error: ${errorName}`;
  }
}

const failTestBuilder = {
  create: (configuredCustomRequest, data, model, testingPropertyName) =>
    new FailTestBuilder(
      configuredCustomRequest,
      data,
      model,
      testingPropertyName
    ),
};

module.exports = { FailTestBuilder, failTestBuilder };
