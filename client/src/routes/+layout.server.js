
export const load = async ({ locals, url }) => {
	
	if (locals.token) {

		return {
			token: locals.token,
			url: url.parthname
		};
		
	} else {
		return {};
	}
	
};
