const { cellphoneRouter } = require("@/routers/cellphone");
const { otherRouter } = require("@/routers/other");
const { privateChatRouter } = require("@/routers/privateChat");
const { testRouter } = require("@/routers/test");
const { userRouter } = require("@/routers/user");
const { versionControlRouter } = require("@/routers/versionControl");

const routers = {
  cellphone: cellphoneRouter,
  other: otherRouter,
  privateChat: privateChatRouter,
  test: testRouter,
  user: userRouter,
  versionControl: versionControlRouter,
};

module.exports = {
  routers,
};