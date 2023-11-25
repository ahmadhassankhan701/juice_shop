import axios from "axios";

const baseUrl = "https://api.paystack.co";

const secretKey = "sk_test_6e9d470df73b0fbd9f42154ca64a74f3011e5c75";

export const createReCheckout = async (
	email,
	amount,
	currency,
	authorization_code
) => {
	try {
		const checkBody = {
			email,
			amount: amount * 100,
			currency,
			authorization_code,
			metadata: {
				cancel_action: "https://example.com/cancel",
			},
		};
		const { data } = await axios.post(
			baseUrl + "/transaction/charge_authorization",
			checkBody,
			{
				headers: {
					Authorization: `Bearer ${secretKey}`,
					"Content-Type": "application/json",
				},
			}
		);
		if (data.status) {
			return data.data;
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};
export const createCheckout = async (email, amount, currency, callback_url) => {
	try {
		const checkBody = { email, amount, currency, callback_url };
		const { data } = await axios.post(
			baseUrl + "/transaction/initialize",
			checkBody,
			{
				headers: {
					Authorization: `Bearer ${secretKey}`,
					"Content-Type": "application/json",
				},
			}
		);
		if (data.status) {
			return data.data;
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};
export const verifyTransaction = async (reference) => {
	try {
		const { data } = await axios.get(
			`${baseUrl}/transaction/verify/${reference}`,
			{
				headers: {
					Authorization: `Bearer ${secretKey}`,
				},
			}
		);
		if (data.status) {
			return data.data;
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};
