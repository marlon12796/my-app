import React, { useEffect, useState } from 'react';
import { ButtonStatus } from '../ButtonStatus';
import { Input, Textarea } from '@nextui-org/react';
import { Sucursal } from '@/types/api/sucursales';
import { postSucursal } from '@/lib/sucursales/PostSucursal';
import { putSucursal } from '@/lib/sucursales/PutSucursal';
export type FormValuesSucursal = Omit<Sucursal, 'idSucursal'>;
export interface FormErrors {
	nombre?: string;
	ubicacion?: string;
}
export const FormularioSucursales = ({
	bearer,
	sucursal,
	id,
	onCleanId,
}: {
	bearer: string;
	sucursal: FormValuesSucursal | undefined;
	id: number | null;
	onCleanId: () => void;
}) => {
	const [values, setValues] = useState<FormValuesSucursal>({
		nombre: sucursal?.nombre ?? '',
		ubicacion: sucursal?.ubicacion ?? '',
	});

	const [errors, setErrors] = useState<FormErrors>({});
	useEffect(() => {
		if (sucursal !== undefined) setValues(sucursal);
	}, [sucursal]);
	useEffect(() => {
		if (id === null) setValues({ nombre: '', ubicacion: '' });
	}, [id, onCleanId]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	const validateForm = () => {
		let tempErrors: FormErrors = {};
		const nombre = values.nombre.trim();
		const descripcion = values.ubicacion.trim();
		if (nombre.length < 3 || nombre.length > 100) tempErrors.nombre = 'El nombre debe tener entre 3 y 100 caracteres.';
		if (descripcion.length < 10) tempErrors.ubicacion = 'La Ubicacion debe tener al menos 10 caracteres.';

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};
	const handleSubmit = (e: FormData) => {
		const isValid = validateForm();
		if (id !== null && isValid) {
			onCleanId();
			putSucursal({
				bearer,
				form: { ...values, idSucursal: id, nombre: values.nombre, ubicacion: values.ubicacion },
			});
			setValues({ nombre: '', ubicacion: '' });
		}
		if (isValid && id === null) {
			postSucursal({ bearer, form: values });
			setValues({ nombre: '', ubicacion: '' });
		}
	};
	return (
		<form className='mt-4 flex flex-col bg-inherit rounded-lg p-4 max-w-2xl mx-auto pt-8' action={handleSubmit}>
			<h2 className='text-white font-bold text-2xl'>{`SUCURSAL ${id !== null ? `${id} (Editando...)` : ''}`}</h2>

			<Input
				type='text'
				name='nombre'
				label='Nombre'
				variant='underlined'
				className='w-full mt-4'
				value={values.nombre}
				onChange={handleChange}
				isInvalid={!!errors.nombre}
				color={errors.nombre ? 'danger' : 'default'}
				errorMessage={errors.nombre}
			/>

			<Input
				type='text'
				name='ubicacion'
				label='Ubicacion'
				variant='underlined'
				className='w-full mt-4 [margin-inline-start:auto]'
				autoComplete='street-address'
				value={values.ubicacion}
				onChange={handleChange}
				isInvalid={!!errors.ubicacion}
				color={errors.ubicacion ? 'danger' : 'default'}
				errorMessage={errors.ubicacion}
			/>

			<ButtonStatus />
		</form>
	);
};
