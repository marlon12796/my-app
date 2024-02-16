'use client';
import { FormValues, FormularioProducts } from '@/components/Forms/FormularioProducts';
import { TableProducts } from '@/components/Tables/TableProducts';
import { ArrayProductos } from '@/types/api/productos';
import { useCallback, useEffect, useState } from 'react';
export const Products = ({ productos, bearer }: { productos?: ArrayProductos; bearer: string }) => {
	const [products, setProducts] = useState<ArrayProductos>(productos ?? []);
	const [IdProduct, setIdProduct] = useState<number | null>(null);
	useEffect(() => {
		if (productos !== undefined) setProducts(productos);
	}, [productos]);

	const productSelected = products?.find((val) => val.id === IdProduct);

	const productWithoutId: FormValues| undefined =
		productSelected !== undefined
			? {
					nombre: productSelected?.nombre,
					descripcion: productSelected?.descripcion,
					precio: productSelected?.precio,
					stock: productSelected?.stock,
			  }
			: undefined;
	const handleChangeIdProduct = (id: number) => {
		setIdProduct(id);
	};
	const handleCleanIdProduct = useCallback(() => {
		setIdProduct(null);
	}, []);

	return (
		<>
			<div className='max-w-6xl mx-auto pt-8'>
				<TableProducts
					productos={products}
					bearer={bearer}
					onChangeId={handleChangeIdProduct}
					onCleanId={handleCleanIdProduct}
					id={IdProduct}
				></TableProducts>
			</div>
			<FormularioProducts
				bearer={bearer}
				producto={productWithoutId}
				id={IdProduct}
				onCleanId={handleCleanIdProduct}
			></FormularioProducts>
		</>
	);
};
