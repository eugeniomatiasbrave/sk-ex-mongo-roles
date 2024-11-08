import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
    const { user } = await parent();
    if (!user || user.role[0].name !== 'admin') {
        throw redirect(302, '/login');
    }
    return { user };
};