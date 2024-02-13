import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux-toolkit/productSlice';
import { getCompanies } from '../redux-toolkit/companySlice';
import { getUsers } from '../redux-toolkit/userSlice';
import useUserContext from './useUserContext';
import userRoles from '../constants/enums';

const useSlice = () => {

    const dispatch = useDispatch<AppDispatch>();
    const userContext = useUserContext();
    const user = userContext ? userContext.user : null;

    const fetchProducts = (token: any) => {
        dispatch(getProducts(token));
    };

    const fetchCompanies = (token: any) => {
        dispatch(getCompanies(token));
    };

    const fetchUsers = (token: any) => {
        user
            &&
            user.userRole === userRoles.ADMIN
            &&
            dispatch(getUsers(token));
    };

    return {
        fetchProducts,
        fetchCompanies,
        fetchUsers
    }
}

export default useSlice