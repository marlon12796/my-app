'use client';
import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

export const ButtonStatus = () => {
	const { pending } = useFormStatus();
	return (
		<Button color='success' className='top-4 ' type='submit' disabled={pending}>
			{pending ? 'Enviando...' : 'Guardar'}
		</Button>
	);
};
