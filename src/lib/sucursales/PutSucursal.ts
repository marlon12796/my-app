'use server';

import { Sucursal } from '@/types/api/sucursales';
import { revalidatePath } from 'next/cache';

export const putSucursal = async ({ bearer, form }: { bearer: string; form: Sucursal }) => {
	const url = `${process.env.NEXT_API_URL}/sucursal/actualizar`;
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
		revalidatePath('/sucursales');
		return data;
	} catch (error) {
		console.error(error);
	}
};
