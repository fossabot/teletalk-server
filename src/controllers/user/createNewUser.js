const { errorThrower } = require("utility-store/src/functions/utilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models");

const { services } = require("@/services");

const { validators } = require("@/validators");

const { errors } = require("@/variables/errors");

const tryToExtractCellphoneFromToken = async (token) => {
  const jwtSecret = authManager.getJwtSignInSecret();
  const verifiedToken = await validators.token(token, jwtSecret);
  errorThrower(verifiedToken.ok === false, () => verifiedToken.error);
  return userPropsUtilities.extractCellphone(verifiedToken.payload);
};

const tryToValidateFirstName = async (firstName) => {
  await validators.firstName(firstName);
};

const tryToValidateLastName = async (lastName) => {
  await validators.lastName(lastName);
};

const tryToFindTemporaryClient = async (cellphone) => {
  const client = await temporaryClients.findClientByCellphone(cellphone);
  errorThrower(!client, () => ({
    ...errors.CURRENT_USER_NOT_EXIST,
    cellphone,
  }));
  return client;
};

const tryToFindUserInDb = async (cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.randomId(models.native.user.userId.maxlength.value);

const tryToSignToken = async (cellphone, userId) => {
  return await authManager.tokenSigner({
    ...cellphone,
    userId,
  });
};

const fixUserDataForDb = ({ token, ...rest }) => {
  return {
    ...rest,
    sessions: [{ token }],
  };
};

const tryToCreateNewUser = async (userDataForDatabase) => {
  await services.createNewUser.run(userDataForDatabase);
};

const responseToCreateNewUser = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchCreateNewUser = commonFunctionalities.controllerErrorResponse;

const createNewUserTrier = async ({ firstName, lastName, verifyToken }) => {
  const trierInstance = trier(createNewUserTrier.name, {
    //CLEANME: remove autoThrowError
    autoThrowError: true,
  });

  const cellphone = await trierInstance
    .tryAsync(tryToExtractCellphoneFromToken, verifyToken)
    .runAsync();

  const userId = getRandomId();

  const token = await trierInstance
    .tryAsync(tryToValidateFirstName, firstName)
    .tryAsync(tryToValidateLastName, lastName)
    .tryAsync(tryToFindTemporaryClient, cellphone)
    .tryAsync(tryToFindUserInDb, cellphone)
    .tryAsync(tryToSignToken, cellphone, userId)
    .runAsync();

  const defaultUserData = {
    ...userPropsUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    token,
    userId,
  };

  const userDataForDatabase = fixUserDataForDb(defaultUserData);

  await trierInstance
    .tryAsync(tryToCreateNewUser, userDataForDatabase)
    .runAsync();

  return defaultUserData;
};

const createNewUser = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { firstName, lastName },
  } = req;
  const token = authManager.getTokenFromRequest(req);

  await trier(createNewUser.name)
    .tryAsync(createNewUserTrier, {
      firstName,
      lastName,
      verifyToken: token,
    })
    .executeIfNoError(responseToCreateNewUser, res)
    .catch(catchCreateNewUser, res)
    .runAsync();
};

module.exports = { createNewUser };
