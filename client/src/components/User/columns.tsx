import type { ColumnsType } from 'antd/es/table';
import { UserDataType } from './types';
import React from 'react';
import { Button } from 'antd';

export const columns = (productData: UserDataType[]) => {

    const handleUser = async (id: string) => {
        console.log(id)
    }

    const userColumns: ColumnsType<UserDataType> = [
        {
            title: 'User ID',
            dataIndex: '_id',
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
            title: 'Last Login Date',
            dataIndex: 'lastLoginAt',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
        },
        {
            title: 'Activity Level',
            dataIndex: 'activityLevel',
            sorter: (a, b) => a.activityLevel - b.activityLevel,
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <div className='flex flex-col gap-4'>
                    <>
                        <Button onClick={() => handleUser(record._id)} type="primary">
                            Action
                        </Button>
                    </>
                </div>
            ),
        },
    ];

    return userColumns;
};