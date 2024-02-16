'use client';

import { COLUMNS_SUCURSAL } from '@/app/data/table';
import { ArraySucursales } from '@/types/api/sucursales';
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { Icon } from '../Icon';
import { deleteSucursal } from '@/lib/sucursales/DeleteSucursal';

export const TableSucursales = ({
	sucursales,
	bearer,
	onChangeId,
	onCleanId,
	id,
}: {
	sucursales: ArraySucursales;
	bearer: string;
	onChangeId: (id: number) => void;
	onCleanId: () => void;
	id: number | null;
}) => {
	return (
		<Table removeWrapper aria-label='Example static collection table'>
			<TableHeader columns={COLUMNS_SUCURSAL}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody>
				{sucursales?.map((sucursal) => (
					<TableRow key={sucursal.idSucursal}>
						<TableCell>{sucursal.nombre}</TableCell>
						<TableCell>{sucursal.ubicacion}</TableCell>
						<TableCell>
							<div className='relative flex items-center gap-2'>
								<Tooltip content='Edit Product'>
									<Chip
										startContent={<Icon.EditIcon />}
										variant='faded'
										color='success'
										className='cursor-pointer'
										onClick={() => {
											onChangeId(sucursal.idSucursal);
										}}
									>
										Editar
									</Chip>
								</Tooltip>
								<Tooltip color='danger' content='Delete Product'>
									<span
										className='text-lg text-danger cursor-pointer active:opacity-50'
										onClick={() => {
											deleteSucursal({ bearer, id: sucursal.idSucursal });
											if (id === sucursal.idSucursal) onCleanId();
										}}
									>
										<Icon.DeleteIcon />
									</span>
								</Tooltip>
							</div>
						</TableCell>
					</TableRow>
				)) ?? []}
			</TableBody>
		</Table>
	);
};
