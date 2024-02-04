import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux-toolkit/productSlice';
import { getCompanies } from '../redux-toolkit/companySlice';

const useSlice = () => {

    const dispatch = useDispatch<AppDispatch>();

    const fetchProducts = (token: any) => {
        dispatch(getProducts(token));
    };

    const fetchCompanies = (token: any) => {
        dispatch(getCompanies(token));
    };

    return {
        fetchProducts,
        fetchCompanies
    }
}

export default useSlice