'use client';
import React, { useEffect, useState } from 'react';
import { Input, Textarea } from '@nextui-org/react';
import { postProducto } from '@/lib/productos/PostProducto';
import { ButtonStatus } from '../ButtonStatus';
import { putProducto } from '@/lib/productos/PutProducto';
import { Producto } from '@/types/api/productos';

export interface FormErrors {
	nombre?: string;
	descripcion?: string;
	precio?: string;
	stock?: string;
}
export type FormValues = Omit<Producto, 'id'>;

export const FormularioProducts = ({
	bearer,
	producto,
	id,
	onCleanId,
}: {
	bearer: string;
	producto?: FormValues;
	id: number | null;
	onCleanId: () => void;
}) => {
	const [values, setValues] = useState<FormValues>({
		nombre: producto?.nombre ?? '',
		descripcion: producto?.descripcion ?? '',
		precio: producto?.precio ?? 0,
		stock: producto?.stock ?? 0,
	});

	const [errors, setErrors] = useState<FormErrors>({});
	useEffect(() => {
		if (producto !== undefined) setValues(producto);
	}, [producto]);
	useEffect(() => {
		if (id === null) setValues({ descripcion: '', nombre: '', precio: 0, stock: 0 });
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
		const descripcion = values.descripcion.trim();
		if (nombre.length < 3 || nombre.length > 100) tempErrors.nombre = 'El nombre debe tener entre 3 y 100 caracteres.';
		if (descripcion.length < 10) tempErrors.descripcion = 'La descripción debe tener al menos 10 caracteres.';

		if (!values.precio || values.precio <= 0) tempErrors.precio = 'El precio debe ser mayor que 0.';

		if (!values.stock || values.stock < 0) tempErrors.stock = 'El stock no puede ser negativo.';

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const handleSubmit = (e: FormData) => {
		const isValid = validateForm();
		if (id !== null && isValid) {
			onCleanId();
			putProducto({
				bearer,
				form: { ...values, id, precio: values.precio, stock: values.stock },
			});
			setValues({ descripcion: '', nombre: '', precio: 0, stock: 0 });
		}
		if (isValid && id === null) {
			postProducto({ bearer, form: values });
			setValues({ descripcion: '', nombre: '', precio: 0, stock: 0 });
		}
	};

	return (
		<form className='mt-4 flex flex-col bg-inherit rounded-lg p-4 max-w-2xl mx-auto pt-8' action={handleSubmit}>
			<h2 className='text-white font-bold text-2xl'>{`PRODUCTO ${id !== null ? `${id} (Editando...)` : ''}`}</h2>

			<Input
				type='text'
				name='nombre'
				label='Nombre'
				variant='bordered'
				placeholder='Nombre Del Producto'
				className='w-full mt-4'
				value={values.nombre}
				onChange={handleChange}
				isInvalid={!!errors.nombre}
				color={errors.nombre ? 'danger' : 'default'}
				errorMessage={errors.nombre}
			/>

			<Textarea
				name='descripcion'
				label='Descripción'
				variant='bordered'
				labelPlacement='outside'
				placeholder='Describe el producto'
				className='w-full mt-4  '
				value={values.descripcion}
				onChange={handleChange}
				isInvalid={!!errors.descripcion}
				color={errors.descripcion ? 'danger' : 'default'}
				errorMessage={errors.descripcion}
			/>
			<div className='mt-4 flex flex-row space-x-2'>
				<div className='flex-1'>
					<Input
						type='number'
						name='precio'
						label='Precio'
						placeholder='0.00'
						inputMode='decimal'
						step='0.01'
						labelPlacement='outside'
						className='mt-4'
						value={values.precio.toString()}
						onChange={handleChange}
						isInvalid={!!errors.precio}
						color={errors.precio ? 'danger' : 'default'}
						errorMessage={errors.precio}
					/>
				</div>
				<div className='flex-1'>
					<Input
						type='number'
						name='stock'
						label='Stock'
						placeholder='0'
						inputMode='numeric'
						step='1'
						labelPlacement='outside'
						className='mt-4'
						value={values.stock.toString()}
						onChange={handleChange}
						isInvalid={!!errors.stock}
						color={errors.stock ? 'danger' : 'default'}
						errorMessage={errors.stock}
					/>
				</div>
			</div>
			<ButtonStatus />
		</form>
	);
};
