import useUserContext from './useUserContext';
import { handleAddCompanyError, handleDeleteCompanyError, handleEditCompanyError } from '../constants/errorConstant/errorCompany';
import { addCompanyService, deleteCompanyService, updateCompanyService } from '../services/companyService';
import { successAddCompany, successDeleteCompany, successEditCompany } from '../constants/notifyConstant/notifyCompany';
import useSlice from './useSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useCompany = () => {
    const { user } = useUserContext();
    const { fetchCompanies, fetchProducts } = useSlice();

    const companies = useSelector((state: RootState) => state.companies.data);
    const companiesStatus = useSelector((state: RootState) => state.companies.status);

    const addCompany = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await addCompanyService(values, user.token);
            successAddCompany(res.data.message)
            fetchCompanies(user.token)
        } catch (error: any) {
            handleAddCompanyError(error);
        }
    };

    const deleteCompany = async (selectedRowKeys: any) => {
        try {
            const res = await Promise.all(selectedRowKeys.map((id: any) => deleteCompanyService(id, user.userId, user.token)));
            const messages = res.map(res => res.data.message);
            messages.forEach(message => {
                successDeleteCompany(message);
            });
            fetchProducts(user.token)
            fetchCompanies(user.token)
        } catch (error: any) {
            handleDeleteCompanyError(error);
        }
    };

    const updateCompany = async (selectedRowKeys: any, values: any) => {
        values.lastUpdaterId = user.userId;
        try {
            const res = await updateCompanyService(selectedRowKeys, values, user.token);
            successEditCompany(res.data.message);
            fetchProducts(user.token)
            fetchCompanies(user.token)
        } catch (error: any) {
            handleEditCompanyError(error);
        }
    };
    
    return { companies, companiesStatus, addCompany, deleteCompany, updateCompany };
};

export default useCompany;