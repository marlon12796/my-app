'use server';

import { ArrayProductos } from '@/types/api/productos';

export const getProducts = async ({ bearer }: { bearer: string }) => {
	const url = `${process.env.NEXT_API_URL}/producto/listarProducto`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${bearer}`,
		},
	};

	try {
		const response = await fetch(url, options);
		const data: ArrayProductos = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
