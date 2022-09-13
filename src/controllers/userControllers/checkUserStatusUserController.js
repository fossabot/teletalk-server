const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { userFinder } = require("@/services/userServices");

const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

//TODO: Add some tests

const fixUserData = (foundUser) => {
  const { tokens, ...userData } = userPropsUtilities.extractUserData(foundUser);
  return {
    user: {
      ...userData,
      mainToken: userPropsUtilities.getTokenFromUserObject({
        tokens,
      }),
    },
  };
};

const tryToCheckUserStatus = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);
  const foundUser = await userFinder(cellphone);
  errorThrower(!foundUser, () => ({ ...USER_NOT_EXIST, cellphone }));
  const fixedUserData = fixUserData(foundUser);
  return fixedUserData;
};

const responseToCheckUserStatus = (userData, res) => {
  commonFunctionalities.controllerSuccessResponse(res, userData);
};

const catchCheckUserStatus = commonFunctionalities.controllerCatchResponse;

const checkUserStatusUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    authData: { payload: userData },
  } = req;

  (
    await trier(checkUserStatusUserController.name).tryAsync(
      tryToCheckUserStatus,
      userData
    )
  )
    .executeIfNoError(responseToCheckUserStatus, res)
    .catch(catchCheckUserStatus, res);
};

module.exports = { checkUserStatusUserController };