'use server';

import { FormValues } from '@/components/Forms/FormularioProducts';
import { revalidatePath } from 'next/cache';

export const postProducto = async ({ bearer, form }: { bearer: string; form: FormValues }) => {
	const url = `${process.env.NEXT_API_URL}/producto/registrarProducto`;
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
		revalidatePath('/');
		return data;
	} catch (error) {
		console.error(error);
	}
};
