'use server';

import { Producto } from '@/types/api/productos';
import { revalidatePath } from 'next/cache';

export const putProducto = async ({ bearer, form }: { bearer: string; form: Producto }) => {

	const url = `${process.env.NEXT_API_URL}/producto/actualizar`;
	const options = {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${bearer}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(form),
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
