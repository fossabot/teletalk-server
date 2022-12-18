const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { errors } = require("@/variables/errors");

const tryTo = (targetCellphone, userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);

  errorThrower(
    isDataHasEqualityWithTargetCellphone(cellphone, targetCellphone),
    () => ({ ...errors.SELF_STUFF, targetCellphone })
  );
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchTryTo = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const cellphoneSelfStuffCheck = (req, res, next) => {
  const targetCellphone = req.body;
  const { payload: userData } = req.authData;

  return trier(cellphoneSelfStuffCheck.name)
    .try(tryTo, targetCellphone, userData)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchTryTo, res)
    .run();
};

module.exports = { cellphoneSelfStuffCheck };
