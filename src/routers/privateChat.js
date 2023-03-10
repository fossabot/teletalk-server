const { Router } = require("express");

const { controllers } = require("@/controllers");

const { routes } = require("@/routes");

const privateChatRouter = Router();

privateChatRouter[routes.privateChat.sendPrivateMessage.method](
  routes.privateChat.sendPrivateMessage.url,
  controllers.sendPrivateMessage
);

privateChatRouter[routes.privateChat.getPrivateChat.method](
  routes.privateChat.getPrivateChat.url,
  controllers.getPrivateChat
);

privateChatRouter[routes.privateChat.getAllPrivateChats.method](
  routes.privateChat.getAllPrivateChats.url,
  controllers.getAllPrivateChats
);

module.exports = { privateChatRouter };
