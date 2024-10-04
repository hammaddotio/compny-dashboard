import React from 'react'

const Error = ({ error }) => {
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <h1 className='font-bold text-3xl'>{error}</h1>
        </div>
    )
}

export default Error
