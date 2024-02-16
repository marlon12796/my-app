'use server';

import { FormValuesSucursal } from '@/components/Forms/FormularioSucursales';
import { revalidatePath } from 'next/cache';

export const postSucursal = async ({ bearer, form }: { bearer: string; form: FormValuesSucursal }) => {
	const url = `${process.env.NEXT_API_URL}/sucursal/registrarSucursal`;
	const options = {
		method: 'POST',
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
