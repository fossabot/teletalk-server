const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/cellphone", "1.0.0");

const addBlock = routeTemplateGenerator(
	"post",
	"/add/block",
	"1.0.0",
	"Use for block single contact on user contacts list",
);

const addBlocks = routeTemplateGenerator(
	"post",
	"/add/blocks",
	"1.0.0",
	"Use for block single contact on user contacts list",
);

const addContact = routeTemplateGenerator(
	"post",
	"/add/contact",
	"1.0.0",
	"Use for add single contact to current user contacts list",
);

const addContacts = routeTemplateGenerator(
	"post",
	"/add/contacts",
	"1.0.0",
	"Use for add single contact to current user contacts list",
);

const editBlock = routeTemplateGenerator(
	"post",
	"/edit/block",
	"1.0.0",
	"User for edit single contact on user contacts list",
);

const editContact = routeTemplateGenerator(
	"post",
	"/edit/contact",
	"1.0.0",
	"User for edit single contact on user contacts list",
);

const getContacts = routeTemplateGenerator(
	"get",
	"/get/contacts",
	"1.0.0",
	"User for edit single contact on user contacts list",
);

const removeBlock = routeTemplateGenerator(
	"post",
	"/remove/block",
	"1.0.0",
	"Use for remove single contact on user contacts list",
);

const removeBlocks = routeTemplateGenerator(
	"post",
	"/remove/blocks",
	"1.0.0",
	"Use for remove single contact on user contacts list",
);

const removeContact = routeTemplateGenerator(
	"post",
	"/remove/contact",
	"1.0.0",
	"Use for remove single contact on user contacts list",
);

const removeContacts = routeTemplateGenerator(
	"post",
	"/remove/contacts",
	"1.0.0",
	"Use for remove single contact on user contacts list",
);

const shareContact = routeTemplateGenerator(
	"post",
	"/share/contact",
	"1.0.0",
	"Use for share single contact on user contacts list",
);

const shareContacts = routeTemplateGenerator(
	"post",
	"/share/contacts",
	"1.0.0",
	"Use for share single contact on user contacts list",
);

const error = routeTemplateGenerator(
	"get",
	"/error",
	"1.0.0",
	"Use for get all contact errors",
);

const template = routeTemplateGenerator(
	"get",
	"/template",
	"1.0.0",
	"Use for get all contact properties and value structure",
);

const cellphoneRouteTemplate = {
	addBlock,
	addBlocks,
	addContact,
	addContacts,
	baseUrl,
	editBlock,
	editContact,
	error,
	getContacts,
	removeBlock,
	removeBlocks,
	removeContact,
	removeContacts,
	shareContact,
	shareContacts,
	template,
	version: "1.0.0",
};

module.exports = {
	cellphoneRouteTemplate,
};