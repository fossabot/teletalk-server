const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const { requesters } = require("$/functions/helpers/requesters");
const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { countries } = require("@/variables/others/countries");

const userModels = models.native.user;

const configuredAddContactRequester = requesters.addContact();

const users = testVariablesManager.getUsers();
const cellphones = testVariablesManager.getCellphones();

describe("add contact success tests", () => {
  it("should add testUser_1 to testUser_0 contact list", async () => {
    const {
      body: {
        addedContact: {
          countryCode,
          countryName,
          firstName,
          lastName,
          phoneNumber,
          userId,
        },
      },
    } = await configuredAddContactRequester.sendFullFeaturedRequest(
      //TODO Use cellphone instead
      users.addContactSuccessful
    );

    integrationHelpers
      .createSuccessTest()
      .userId({
        clientValue: users.addContactSuccessful.userId,
        responseValue: userId,
      })
      .countryCode({
        clientValue: users.addContactSuccessful.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        clientValue: users.addContactSuccessful.countryName,
        responseValue: countryName,
      })
      .phoneNumber({
        clientValue: users.addContactSuccessful.phoneNumber,
        responseValue: phoneNumber,
      })
      .lastName({
        clientValue: users.addContactSuccessful.lastName,
        responseValue: lastName,
      })
      .firstName({
        clientValue: users.addContactSuccessful.firstName,
        responseValue: firstName,
      });
  });
});

describe("addContact failure tests", () => {
  //* Add someone to contacts for contactItemExist fail tests
  before(async () => {
    await configuredAddContactRequester.sendFullFeaturedRequest(
      users.contactItemExist
    );
  });

  const contact = userPropsUtilities.makeRandomContact(
    userModels.firstName.maxlength.value,
    userModels.lastName.maxlength.value,
    countries
  );
  integrationHelpers
    .createFailTest(configuredAddContactRequester)
    .authentication()
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact)
    .selfStuff(users.selfStuff)
    .contactItemExist(users.contactItemExist)
    .targetUserNotExist(cellphones.notExistedContact);
});