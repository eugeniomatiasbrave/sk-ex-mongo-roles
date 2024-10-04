import { error } from '@sveltejs/kit';

const API_URL = process.env.VITE_API_URL;

export const actions = {
    default: async ({ cookies, request }) => {
        try {
            const formData = await request.formData();
            const email = formData.get('email');
            const password = formData.get('password');

            if (!email || !password) {
                return { success: false, error: 'Error Data' };
            }

            const login = { email, password };

            const res = await fetch(`${API_URL}/sessions/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (!res.ok) {
                return { success: false, message: 'Datos de acceso incorrectos' };
            }

            const data = await res.json();

            cookies.set('AuthorizationToken', `Bearer ${data.token}`, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });

            return { success: true };
        } catch (err) {
            console.error('Error: ', err);
            throw error(500, 'Something went wrong logging in');
        }
    }
};