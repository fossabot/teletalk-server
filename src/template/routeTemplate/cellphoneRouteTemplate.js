const cellphoneRouteTemplate = {
	baseRoute: "/cellphone",

	addContact: {
		route: "/add/contact",
		description: "Use for add single contact to current user contacts list",
	},
	addBlacklist: {
		route: "add/blacklist/",
		description: "Use for block single contact on user contacts list",
	},
	edit: {
		route: "/edit/",
		description: "User for edit single contact on user contacts list",
	},
	remove: {
		route: "/remove/",
		description: "Use for remove single contact on user contacts list",
	},
	share: {
		route: "/share/",
		description: "Use for share single contact on user contacts list",
	},

	error: {
		route: "/error/",
		description: "Use for get all contact errors",
	},
	template: {
		route: "/template/",
		description: "Use for get all contact properties and value structure",
	},
};

module.exports = { cellphoneRouteTemplate };