const JWT = require("jsonwebtoken");

const { initialValue } = require("~/constant/initialValue/initialValue");

const initialOptions = initialValue.JWTOptions;

const tokenVerifier = async ({ token, secret, options = initialOptions }) => {
	const data = JWT.verify(token, secret || process.env.JWT_MAIN_SECRET, {
		complete: true,
		...initialOptions,
		...options,
	});

	return { data };
};

module.exports = { tokenVerifier };