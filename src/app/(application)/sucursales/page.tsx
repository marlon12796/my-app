import { Sucursales } from '@/components/Sucursales';
import { getUser } from '@/lib/auth';
import { getSucursales } from '@/lib/sucursales/GetSucursales';
import { GetTokenUser } from '@/types/api/token';

const Page = async () => {
	const authData: GetTokenUser = await getUser();
	const sucursales = await getSucursales({ bearer: authData.accessToken });

	return <Sucursales bearer={authData.accessToken} sucursales={sucursales ?? []}></Sucursales>;
};

export default Page;
