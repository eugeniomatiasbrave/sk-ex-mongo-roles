
export const load = async ({ locals }) => {
	
	if (locals.token) {
		return {
			token: locals.token
		};

	} else {
		return {};
	}
};