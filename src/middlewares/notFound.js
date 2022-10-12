const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  appErrors: { ROUTE_NOT_FOUND },
} = require("@/variables/errors/appErrors");

const isRouteObjectInvalid = ({ fullUrl, inputFields, outputFields, url }) =>
  customTypeof.isUndefined(fullUrl, inputFields, outputFields, url);

const tryToValidateRouteObject = (routeObject) => {
  errorThrower(isRouteObjectInvalid(routeObject), ROUTE_NOT_FOUND);
};

const catchValidateRouteObject = commonFunctionalities.controllerCatchResponse;

//TODO: Add some tests
const notFound = (req, res, next) => {
  trier(notFound.name)
    .try(tryToValidateRouteObject, req.routeObject)
    .executeIfNoError(() => next())
    .catch(catchValidateRouteObject, res);
};

module.exports = { notFound };