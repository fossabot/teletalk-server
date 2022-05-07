const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  randomStringNumber,
  makeCellphone,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: {
    properties: {
      countryCodeModel: { properties: countryCodeModel },
    },
  },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    properties: {
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
      COUNTRY_CODE_MAXLENGTH_REACH: {
        properties: COUNTRY_CODE_MAXLENGTH_REACH,
      },
      COUNTRY_CODE_MINLENGTH_REACH: {
        properties: COUNTRY_CODE_MINLENGTH_REACH,
      },
      COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
      COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
      COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;

const countryCodeFailureTests = (cellphone) => {
  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await customRequest.sendRequest(
      makeCellphone(undefined, cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await customRequest.sendRequest(
      makeCellphone("98!", cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_NUMERIC
    );
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await customRequest.sendRequest(
      makeCellphone(98, cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await customRequest.sendRequest(
      makeCellphone("010101", cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      makeCellphone(
        randomStringNumber(countryCodeMinlength - 1),
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      makeCellphone(
        randomStringNumber(countryCodeMaxlength + 1),
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryCodeFailureTests };
