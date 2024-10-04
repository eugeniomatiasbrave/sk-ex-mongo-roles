import { fail } from "@sveltejs/kit";

const API_URL = process.env.VITE_API_URL;

export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email");
		const name = formData.get("name");
		const password = formData.get("password");

		const body = { email, name , password };

		if (!email) {
			return fail(400, { email, missing: true });
		}
		if (!password) {
			return fail(400, { password, missing: true });
		}

		const res = await fetch(`${API_URL}/session/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const data = await res.json();

		if (!res.ok) {
			return fail(res.status, data);
		}

    return {
        status: 200,
        body: { message: "Register successful" }
	};
  }
};