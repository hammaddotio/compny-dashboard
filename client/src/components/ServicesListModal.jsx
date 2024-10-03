import React, { useState } from 'react';
import { Button, Modal, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePriceList } from '../context/PriceListContext';

const ServicesListModal = ({ selectedPlan }) => {
    const navigate = useNavigate()
    const { selectedPlanForPayment, setSelectedPlanForPayment } = usePriceList()

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
        console.log(selectedPlan)
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setSelectedPlanForPayment(selectedPlan)

            console.log(selectedPlanForPayment)
            localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan))
            setOpen(false);
            setConfirmLoading(false);
            localStorage.getItem('token') ? navigate('/payment') : navigate('/sign-in')
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Select
            </Button> */}
            <Button type="button" variant='outlined' onClick={showModal}>VIEW DETAILS</Button>
            <Modal
                title={<>
                    {/* <h1>{selectedPlan.name}</h1> */}
                    {/* <p>Lock In Your Savings With A Multi-Month Term.</p> */}
                </>}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {/* Plan Title and Price */}
                <div className="flex justify-between items-center mt-4">
                    <h3 className="font-bold text-lg">{selectedPlan.name}</h3>
                    <p className="font-semibold">$ {selectedPlan.price} /month</p>
                </div>

                {/* Plan Description */}
                <p className="text-gray-600 mb-4 font-medium">{selectedPlan.description}</p>
                <List
                    header={''}
                    dataSource={selectedPlan.services}
                    renderItem={(item) => {
                        console.log('item', item)
                        return (
                            <List.Item>
                                <div key={item} className="flex flex-col space-y-2 p-4">
                                    {/* Services Offered */}
                                    <ul className="list-disc">
                                        <li key={item} className="text-gray-800">
                                            {item}
                                        </li>
                                    </ul>
                                </div>
                            </List.Item>
                        )
                    }}
                />

            </Modal>
        </>
    );
};
export default ServicesListModal;