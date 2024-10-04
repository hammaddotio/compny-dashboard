import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authHeaders, UPDATE_SERVICE_API, URL } from '../constant';
import { EditOutlined } from '@ant-design/icons';

const UpdateService = ({ fetchServicePlans, selectedPlan }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [services, setServices] = useState([]);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        services: ''
    });

    // Prefill fields when a plan is selected for updating
    useEffect(() => {
        if (selectedPlan) {
            setName(selectedPlan.name);
            setDescription(selectedPlan.description);
            setPrice(selectedPlan.price);
            setServices(selectedPlan.services);
        }
    }, [selectedPlan]);

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

        if (!name) newErrors.name = 'Please enter the plan name.';
        if (!description) newErrors.description = 'Please enter the plan description.';
        if (!price || isNaN(price)) newErrors.price = 'Please enter a valid price.';
        if (services.length === 0) newErrors.services = 'Please enter at least one service.';

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleOk = async () => {
        if (!validateFields()) return;

        setConfirmLoading(true);

        const updatedPlan = {
            name,
            description,
            price,
            services,
        };

        try {
            const response = await axios.patch(`${URL}${UPDATE_SERVICE_API}/${selectedPlan._id}`, updatedPlan, authHeaders);

            if (response.status === 200) {
                setConfirmLoading(false);
                setOpen(false);
                fetchServicePlans(); // Refetch plans to reflect the update
                navigate('/plans');
            }
        } catch (error) {
            console.error('Error updating plan:', error);
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                classNames={''}
                icon={<EditOutlined />}
                type="button"
                onClick={showModal}
                size="middle"
            />

            <Modal
                title="Update Plan"
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

export default UpdateService;
