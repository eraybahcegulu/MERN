import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux-toolkit/productSlice';
import { getCompanies } from '../redux-toolkit/companySlice';
import { getUsers } from '../redux-toolkit/userSlice';

const useSlice = () => {
    const dispatch = useDispatch<AppDispatch>();

    const fetchProducts = (token: any) => {
        dispatch(getProducts(token));
    };

    const fetchCompanies = (token: any) => {
        dispatch(getCompanies(token));
    };

    const fetchUsers = (token: any) => {
        dispatch(getUsers(token));
    };

    return {
        fetchProducts,
        fetchCompanies,
        fetchUsers
    }
}

export default useSlice