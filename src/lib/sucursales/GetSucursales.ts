'use server';

import { ArrayProductos } from '@/types/api/productos';
import { ArraySucursales } from '@/types/api/sucursales';

export const getSucursales = async ({ bearer }: { bearer: string }) => {
	const url = `${process.env.NEXT_API_URL}/sucursal/listarSucursales`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${bearer}`,
		},
	};

	try {
		const response = await fetch(url, options);
		const data: ArraySucursales = await response.json();
		return data ?? [];
	} catch (error) {
		console.error(error);
	}
};
