import { Card } from 'antd'
import React from 'react'
import { HomeOutlined, InboxOutlined  } from '@ant-design/icons';

const Panels = () => {
    return (
        <div className='w-[80vw] flex flex-wrap items-center justify-center gap-4'>

            <Card >
                <div className='flex flex-row items-center   gap-10'>
                    <HomeOutlined className='text-6xl' />

                    <div className='flex flex-col gap-2 '>
                            <span className='text-xl'>TOTAL COMPANY</span>
                            <span className='text-2xl'><strong> 1 </strong> </span>
                    </div>
                </div>

            </Card>

            <Card>
                <div className='flex flex-row items-center gap-10'>
                    <InboxOutlined  className='text-6xl' />

                    <div className='flex flex-col gap-2 '>
                            <span className='text-xl'>TOTAL PRODUCTS</span>
                            <span className='text-2xl'><strong> 1 </strong> </span>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default Panels