import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getProducts } from '../redux-toolkit/productSlice';

const useProductSlice = () => {
    const dispatch = useDispatch<AppDispatch>();

    const fetchProducts = (token: any) => {
        dispatch(getProducts(token));
    };

    return { fetchProducts };
};

export default useProductSlice;
