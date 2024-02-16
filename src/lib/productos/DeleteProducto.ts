'use server';

import { revalidatePath } from 'next/cache';

export const deleteProducto = async ({ bearer, id }: { bearer: string; id: number }) => {
	const url = `${process.env.NEXT_API_URL}/producto/eliminar/${id}`;
	const options = {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${bearer}`,
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		revalidatePath('/');
		return data;
	} catch (error) {
		console.error(error);
	}
};
