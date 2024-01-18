import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchProductData } from '../redux-toolkit/productSlice';

const useProductSlice = () => {
    const dispatch = useDispatch<AppDispatch>();

    const fetchProduct = (token: any) => {
        dispatch(fetchProductData(token));
    };

    return { fetchProduct };
};

export default useProductSlice;
