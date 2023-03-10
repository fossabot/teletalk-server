const { expect } = require("chai");

const { services } = require("@/services");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await services.getAllUsers().run();
    expect(users).to.be.an(FIELD_TYPE.ARRAY);
  });

  // it("should get specified user data", async () => {
  //   const users = await services.getAllUsers().run();

  //   expect(users).to.be.an(FIELD_TYPE.ARRAY);

  //   //TODO: Test all users
  //   const userId = users[0].userId;
  //   const user = await services.findOneUserById(userId);
  //   //TODO: Test all fields
  //   expect(user).to.be.a(FIELD_TYPE.OBJECT);
  // });
});
