import React from 'react';
import { columns } from './columns';
import { Alert, Spin, Table } from 'antd';
import useUser from '../../hooks/useUser';

const UserList = () => {
    const { users, usersStatus } = useUser();

    const userColumns = columns(users);

    return (
        <>
            {usersStatus === 'loading' && (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            )}

            {usersStatus === 'succeeded' && users.length > 0 && (
                <Table
                    scroll={{ y: 630, x: 800 }}
                    className="max-w-[475px] md:max-w-[750px] xl:max-w-[1200px]"
                    rowKey="_id"
                    columns={userColumns}
                    dataSource={users}
                />
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
