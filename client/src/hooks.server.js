import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('AuthorizationToken');
	console.log('cookies:', token);

	if (event.route.id && event.route.id.includes('auth')) {
	
		if (!token) {
			event.cookies.delete('AuthorizationToken', { path: '/' }); 
			throw redirect(303, '/');
		}
	}
	
	if (token) {
		event.locals.token = token;
		console.log('ok hook:', event.locals);
	}

	const response = await resolve(event);
	return response;
};