'use client';
import { ArraySucursales } from '@/types/api/sucursales';
import { useEffect, useState } from 'react';
import { TableSucursales } from './Tables/TableSucursales';
import { FormularioSucursales } from './Forms/FormularioSucursales';

export const Sucursales = ({ bearer, sucursales }: { bearer: string; sucursales: ArraySucursales }) => {
	const [sucursalesData, setSucursales] = useState<ArraySucursales>(sucursales ?? []);
	const [idSucursal, setIdSucursal] = useState<number | null>(null);
	useEffect(() => {
		if (sucursales !== undefined) setSucursales(sucursales);
	}, [sucursales]);
	const sucursalSelected = sucursales?.find((val) => val.idSucursal === idSucursal);
	const handleChangeIdSucursal = (id: number) => {
		setIdSucursal(id);
	};
	const handleCleanIdSucursal = () => {
		setIdSucursal(null);
	};
	return (
		<>
			<div className='max-w-6xl mx-auto pt-8'>
				<TableSucursales
					sucursales={sucursalesData}
					bearer={bearer}
					onChangeId={handleChangeIdSucursal}
					onCleanId={handleCleanIdSucursal}
					id={idSucursal}
				></TableSucursales>
				<FormularioSucursales
					bearer={bearer}
					sucursal={sucursalSelected}
					id={idSucursal}
					onCleanId={handleCleanIdSucursal}
				></FormularioSucursales>
			</div>
		</>
	);
};
