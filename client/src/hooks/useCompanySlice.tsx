import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchCompanyData } from '../redux-toolkit/companySlice';

const useCompanySlice = () => {
    const dispatch = useDispatch<AppDispatch>();

    const fetchCompany = (token: any) => {
        dispatch(fetchCompanyData(token));
    };

    return { fetchCompany };
};

export default useCompanySlice;
