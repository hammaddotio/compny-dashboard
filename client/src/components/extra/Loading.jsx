import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <Spin size="large" />
        </div>
    );
};

export default Loading;
