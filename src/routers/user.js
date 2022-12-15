const { Router } = require("express");

const { controllers } = require("@/controllers");

const { middlewares } = require("@/middlewares");

const { routes } = require("@/routes");
const {
  applyMiddlewaresByUrl,
} = require("@/middlewares/applyMiddlewaresByUrl");

const userRouter = Router();

userRouter.use(
  applyMiddlewaresByUrl(
    [routes.user.logoutNormal.url, routes.user.updatePersonalInfo.url],
    middlewares.findCurrentUserFromDb,
    middlewares.attachCurrentUserId
  )
);

userRouter[routes.user.getUserData.method](
  routes.user.getUserData.url,
  controllers.getUserData
);

userRouter[routes.user.createNewUser.method](
  routes.user.createNewUser.url,
  controllers.createNewUser
);

userRouter[routes.user.getTargetUserData.method](
  routes.user.getTargetUserData.url,
  controllers.getTargetUserData
);

userRouter[routes.user.getPublicUserInfo.method](
  routes.user.getPublicUserInfo.url,
  controllers.getPublicUserInfo
);

userRouter[routes.user.logoutNormal.method](
  routes.user.logoutNormal.url,
  controllers.logoutNormal
);

userRouter[routes.user.signInNormal.method](
  routes.user.signInNormal.url,
  middlewares.cellphoneValidator,
  controllers.signInNormal
);

userRouter[routes.user.updatePersonalInfo.method](
  routes.user.updatePersonalInfo.url,
  controllers.updatePersonalInfo
);

userRouter[routes.user.verifySignInNormal.method](
  routes.user.verifySignInNormal.url,
  middlewares.verificationCodeValidator,
  middlewares.verifyVerificationCode,
  controllers.verifySignInNormal
);

module.exports = { userRouter };
