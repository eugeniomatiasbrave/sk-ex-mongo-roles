/*
import { error, redirect } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
//import { date } from 'zod';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		try {
			const res = await fetch(BASE_URL + '/usuarios/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: username,
					clave: password
				})
			});
			if (res.status === 200) {
				const datos = await res.json();
				cookies.set('AuthorizationToken', `Bearer ${datos.access_token}`, {
					httpOnly: true,
					path: '/',
					secure: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 // 1 day
				});
				cookies.set(
					'Usuario',
					JSON.stringify({
						usuario_id: datos.usuario_id,
						nombre: datos.nombre
					}),
					{
						httpOnly: true,
						path: '/',
						secure: true,
						sameSite: 'strict',
						maxAge: 60 * 60 * 24 // 1 day
					}
				);
			} else {
				return { success: false, message: 'Datos de acceso incorrectos' };
			}
		} catch (err) {
			console.log('Error: ', err);
			error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/');
	}
};

*/