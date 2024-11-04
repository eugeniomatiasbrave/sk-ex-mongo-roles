
export const load = async ({ locals, url }) => {
	
if (locals.user) {
        return {
            user: locals.user,
			isAdmin: locals.isAdmin,
            isModerator: locals.isModerator,
            url: url.pathname
        };
		
	} else {
		return {
			user: null,
			url: url.pathname
		};
	}
	
};
