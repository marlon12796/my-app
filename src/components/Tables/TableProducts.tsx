'use client';
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { columns } from '@/app/data/table';
import { ArrayProductos } from '@/types/api/productos';
import { Icon } from '../Icon';
import { deleteProducto } from '@/lib/productos/DeleteProducto';

export const TableProducts = ({
	productos,
	bearer,
	onChangeId,
	onCleanId,
	id,
}: {
	productos?: ArrayProductos;
	bearer: string;
	onChangeId: (id: number) => void;
	onCleanId: () => void;
	id: number | null;
}) => {
	return (
		<>
			<Table removeWrapper aria-label='Example static collection table'>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody>
					{productos?.map((producto) => (
						<TableRow key={producto.id}>
							<TableCell>{producto.nombre}</TableCell>
							<TableCell>{producto.descripcion}</TableCell>
							<TableCell>{producto.precio}</TableCell>
							<TableCell>{producto.stock}</TableCell>
							<TableCell>
								<div className='relative flex items-center gap-2'>
									<Tooltip content='Edit Product'>
										<Chip
											startContent={<Icon.EditIcon />}
											variant='faded'
											color='success'
											className='cursor-pointer'
											onClick={() => {
												onChangeId(producto.id);
											}}
										>
											Editar
										</Chip>
									</Tooltip>
									<Tooltip color='danger' content='Delete Product'>
										<span
											className='text-lg text-danger cursor-pointer active:opacity-50'
											onClick={() => {
												deleteProducto({ bearer, id: producto.id });
												if (id === producto.id) onCleanId();
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
		</>
	);
};
