import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getCompanies } from '../redux-toolkit/companySlice';

const useCompanySlice = () => {
    const dispatch = useDispatch<AppDispatch>();

    const fetchCompanies = (token: any) => {
        dispatch(getCompanies(token));
    };
    
    return { fetchCompanies };
};

export default useCompanySlice;
