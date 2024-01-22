import useUserContext from './useUserContext';
import useCompanySlice from './useCompanySlice';
import { handleAddCompanyError, handleDeleteCompanyError, handleEditCompanyError } from '../constants/errorConstant/errorCompany';
import { createCompany, removeCompany, updateCompany } from '../services/companyService';
import { successAddCompany, successDeleteCompany, successEditCompany } from '../constants/notifyConstant/notifyCompany';
import useProductSlice from './useProductSlice';

const useCompany = () => {
    const { user } = useUserContext();
    const { fetchCompany } = useCompanySlice();
    const { fetchProduct } = useProductSlice();
    
    const addCompany = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await createCompany(values, user.token);
            successAddCompany(res.data.message)
            fetchCompany(user.token)
        } catch (error: any) {
            handleAddCompanyError(error);
        }
    };

    const deleteCompany = async (selectedRowKeys: any) => {
        try {
            const res = await Promise.all(selectedRowKeys.map((id: any) => removeCompany(id, user.userId, user.token)));
            const messages = res.map(res => res.data.message);
            messages.forEach(message => {
                successDeleteCompany(message);
            });
            fetchProduct(user.token)
            fetchCompany(user.token)
        } catch (error: any) {
            handleDeleteCompanyError(error);
        }
    };

    const editCompany = async (selectedRowKeys: any, values: any) => {
        values.lastUpdaterId = user.userId;
        try {
            const res = await updateCompany(selectedRowKeys, values, user.token);
            successEditCompany(res.data.message);
            fetchCompany(user.token)
        } catch (error: any) {
            handleEditCompanyError(error);
        }
    };
    
    return { addCompany, deleteCompany, editCompany };
};

export default useCompany;