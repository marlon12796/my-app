'use server';
export const getUser = async () => {
	const url = `${process.env.NEXT_API_URL}/api/auth/login`;
	const options = {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ username: 'marlonutx', password: '12345' }),
	};

	try {
		const response = await fetch(url, { ...options, cache: 'no-cache' });
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
