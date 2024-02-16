'use client';
import { Avatar, Chip, Tab, Tabs } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export const Banner = async () => {
	const pathname = usePathname();
	const keySelect = pathname.substring(1) === '' ? 'productos' : pathname.substring(1);

	return (
		<div className='flex w-full flex-row gap-10 max-w-6xl mx-auto pt-2 items-center '>
			<Avatar isBordered color='secondary' src='https://github.com/shadcn.png' />
			<Tabs
				aria-label='Options'
				color='primary'
				variant='underlined'
				selectedKey={keySelect}
				classNames={{
					tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
					cursor: 'w-full bg-[#22d3ee]',
					tab: 'max-w-fit px-0 h-12',
					tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
				}}
			>
				<Tab
					key='productos'
					href='/'
					title={
						<div className='flex items-center space-x-2'>
							<span>Productos</span>
						</div>
					}
				/>
				<Tab
					key='sucursales'
					href='/sucursales'
					title={
						<div className='flex items-center space-x-2'>
							<span>Sucursales</span>
						</div>
					}
				/>
			</Tabs>
		</div>
	);
};
