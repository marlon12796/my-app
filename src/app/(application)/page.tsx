import { Products } from '@/components/Products';
import { getUser } from '@/lib/auth';
import { getProducts } from '@/lib/productos/GetProducts';
import { GetTokenUser } from '@/types/api/token';

const App = async () => {
	const authData: GetTokenUser = await getUser();
	const listProducts = await getProducts({ bearer: authData.accessToken });
	return <Products bearer={authData.accessToken} productos={listProducts} />;
};

export default App;
