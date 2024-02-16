import { Banner } from '@/components/Banner';

export default async function Home({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-[100dvh] dark text-foreground bg-background '>
			<Banner></Banner>
			{children}
		</main>
	);
}
