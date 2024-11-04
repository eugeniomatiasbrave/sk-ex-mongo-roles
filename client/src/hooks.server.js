import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
    const token = event.cookies.get('AuthorizationToken');

    if (event.route.id && event.route.id.includes('auth')) {
        if (!token) {
            event.cookies.delete('AuthorizationToken', { path: '/' }); 
            throw redirect(303, '/');
        }
    }
    
	if (token) {
        const decodedToken = jwt.decode(token);
        event.locals.user = decodedToken;
        event.locals.isAdmin = decodedToken.role[0].name === 'admin';
        event.locals.isModerator = decodedToken.role[0].name === 'moderator';
        console.log('ok hook:', event.locals);
    }

    const user = event.locals.user;
    

    if (event.url.pathname.startsWith('/admin')) {
        if (!user || user.role[0].name !== 'admin') {
            throw redirect(303, '/login');
        }
    }

    if (event.url.pathname.startsWith('/moderator')) {
        if (!user || user.role[0].name !== 'moderator') {
            throw redirect(303, '/login');
        }
    }

    const response = await resolve(event);
    return response;
};