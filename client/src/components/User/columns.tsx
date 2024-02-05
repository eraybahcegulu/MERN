import type { ColumnsType } from 'antd/es/table';
import { UserDataType } from './types';

export const columns = (productData: UserDataType[]) => {

    const userColumns: ColumnsType<UserDataType> = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            filters: productData.map((item) => ({
                text: item.userName,
                value: item.userName,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.userName.startsWith(value),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            filters: productData.map((item) => ({
                text: item.email,
                value: item.email,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.email.startsWith(value),
        },
        {
            title: 'User Role',
            dataIndex: 'userRole',
            filters: productData.map((item) => ({
                text: item.userRole,
                value: item.userRole,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.userRole.startsWith(value),
        },
    ];
    
    return userColumns;
};