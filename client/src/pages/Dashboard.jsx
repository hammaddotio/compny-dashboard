import React, { useState } from 'react';
import { Button, Modal, Card } from 'antd';
import { plans } from '../utils'
import ServicesListModal from './../components/ServicesListModal';
import { usePriceList } from '../context/PriceListContext';

const Dashboard = ({ }) => {
    const { selectedPlan } = usePriceList()

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };

    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='h-[100vh] w-[100%] flex justify-center items-center'>
                <div>

                </div>
                <Button type="primary" onClick={() => setOpen(true)} className='text-xl p-4'>
                    Plans
                </Button>
            </div>
            <Modal
                title="Plans"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Card title="">

                    {
                        plans.map((plan, index) => {
                            console.log('selectPlan', selectedPlan)
                            return (
                                <Card.Grid style={gridStyle}>
                                    <div key={index}>
                                        <h3 className="text-lg font-bold">{plan.name}</h3>
                                        <p className='my-4'>{plan.price} days</p>
                                        <ServicesListModal selectedPlan={plan} />
                                    </div>
                                </Card.Grid>
                            )
                        })
                    }
                </Card>
            </Modal>
        </>
    );
};
export default Dashboard;