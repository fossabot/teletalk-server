const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

//! Require before internal files!
require("@/others/startupRequirements").startupRequirements();

const { authManager } = require("@/classes/AuthManager");
const { eventManager } = require("@/classes/EventManager");

const { setTestUsers } = require("$/functions/utilities/testUtilities");

const {
  common: { userId: userIdCommonModel },
} = require("@/models/native/common");

const { countries } = require("@/variables/others/countries");

const { services } = require("@/services");

const tryToAddTestUser = async ({
  countryCode,
  countryName,
  index,
  testUsers,
}) => {
  const phoneNumber = `000000000${index}`;

  const userId = randomMaker.randomId(userIdCommonModel.maxlength.value);

  const mainToken = await authManager.tokenSigner({
    countryCode,
    countryName,
    phoneNumber,
    userId,
  });

  testUsers[`testUser_${index}`] = await services.addTestUser({
    countryCode,
    countryName,
    firstName: "test",
    lastName: `user_${index}`,
    mainToken,
    phoneNumber,
    userId,
  });
};

describe("Add requirements to application state", () => {
  it("should make test users and save into state", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );

    const users = Array.from({ length: 100 });

    const testUsers = {};

    for (let index = 0; index < users.length; index++) {
      await trier(tryToAddTestUser.name).tryAsync(tryToAddTestUser, {
        countryCode,
        countryName,
        index,
        testUsers,
      });
    }

    await setTestUsers(testUsers);

    const { setRequirementsGetDone: requirementsGetDone } =
      eventManager.eventKeys;
    eventManager.emitEvent(requirementsGetDone);
  });
});