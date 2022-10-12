const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { validators } = require("@/validators/validators");

const tryToValidateCellphone = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);
  await validators.cellphone(cellphone);
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateCellphone = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const cellphoneValidatorMiddleware = async (req, res, next) => {
  return (
    await trier(cellphoneValidatorMiddleware.name).tryAsync(
      tryToValidateCellphone,
      req.body
    )
  )
    .executeIfNoError(executeIfNoError, next)
    .catch(catchValidateCellphone, res)
    .result();
};

module.exports = { cellphoneValidator: cellphoneValidatorMiddleware };