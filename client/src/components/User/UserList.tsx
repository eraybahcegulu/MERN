import React from 'react';
import { columns } from './columns';
import { Alert, Button, Spin, Table } from 'antd';
import useUser from '../../hooks/useUser';
import exportToExcel from '../../utils/exportToExcel';
import { DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';

const UserList = () => {
    const { users, usersStatus } = useUser();

    const userColumns = columns(users);

    const handleExportExcel = () => {
        exportToExcel(users, userColumns, 'users');
    };

    return (
        <>
            {usersStatus === 'loading' && (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            )}

            {usersStatus === 'succeeded' && users.length > 0 && (
                <>
                    <Table
                        scroll={{ y: 630, x: 800 }}
                        className="max-w-[475px] md:max-w-[750px] xl:max-w-[1200px]"
                        rowKey="_id"
                        columns={userColumns}
                        dataSource={users}
                    />
                    <div className='flex flex-row justify-end items-center'> <Button className=' flex items-center hover:scale-105 transition-all' type="primary" icon={<DownloadOutlined />} onClick={handleExportExcel}>
                        Export to Excel <FileExcelOutlined />
                    </Button>
                    </div>
                </>
            )}

            {usersStatus === 'succeeded' && users.length === 0 && (
                <Alert message="Product not found" type="warning" />
            )}

            {usersStatus === 'failed' && (
                <Alert message="Server Error" type="error" />
            )}


        </>
    );
};

export default UserList;
