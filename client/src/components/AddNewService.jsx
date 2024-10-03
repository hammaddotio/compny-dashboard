import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { CREATE_SERVICE_API, URL } from '../constant';

const AddNewService = ({ fetchServicePlans }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [services, setServices] = useState([]);
    const [createdPlan, setCreatedPlan] = useState(null); // For displaying the plan after creation

    // Error states
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        services: ''
    });

    const showModal = () => {
        setOpen(true);
    };

    const validateFields = () => {
        const newErrors = {
            name: '',
            description: '',
            price: '',
            services: ''
        };

        if (!name) {
            newErrors.name = 'Please enter the plan name.';
        }
        if (!description) {
            newErrors.description = 'Please enter the plan description.';
        }
        if (!price || isNaN(price)) {
            newErrors.price = 'Please enter a valid price.';
        }
        if (services.length === 0) {
            newErrors.services = 'Please enter at least one service.';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleOk = async () => {
        if (!validateFields()) {
            return;
        }

        setConfirmLoading(true);

        const selectedPlan = {
            name,
            description,
            price,
            services,
        };
        console.log(selectedPlan)

        try {
            // API call to create a new service plan
            const response = await axios.post(`${URL}${CREATE_SERVICE_API}`, selectedPlan);  // Adjust the API endpoint
            console.log(response)

            if (response.status === 201) {
                setCreatedPlan(response.data.plan); // Store created plan details for display
                localStorage.setItem('selectedPlan', JSON.stringify(response.data.plan));
                setConfirmLoading(false);
                setOpen(false);
                navigate('/plans'); // Navigate to the payment page after plan creation
                fetchServicePlans()
            }
        } catch (error) {
            console.error('Error creating plan:', error);
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="button" variant='filled' onClick={showModal}>ADD NEW PLAN</Button>
            <Modal
                title={'Add New Service Plan'}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <Input
                        className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Price Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="number"
                        className={`mt-1 block w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                {/* Services Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Services (comma separated) <span className="text-red-500">*</span>
                    </label>
                    <Input
                        className={`mt-1 block w-full border ${errors.services ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        value={services.join(', ')}
                        onChange={(e) => setServices(e.target.value.split(',').map(item => item.trim()))}
                    />
                    {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
                </div>
            </Modal>
        </>
    );
};

export default AddNewService;
