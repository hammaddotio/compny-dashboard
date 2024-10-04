import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import { authHeaders, GET_USER_API, UPDATE_USER_INFO_API, URL } from '../constant';

const EditUserInfo = ({ userId, icon, getUser }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    // Form fields
    const [clientName, setClientName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [officialEmail, setOfficialEmail] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [industry, setIndustry] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`${URL}${GET_USER_API}`, authHeaders);
                const userData = response.data.user;

                // Setting initial values from fetched data
                setClientName(userData.username || '');
                setCompanyName(userData.company_name || '');
                setContactPerson(userData.contact_person || '');
                setOfficialEmail(userData.official_email || '');
                setPersonalEmail(userData.personal_email || '');
                setPhoneNumber(userData.phone_number || '');
                setAddress(userData.address || '');
                setWebsiteUrl(userData.website_url || '');
                setIndustry(userData.industry || '');
            } catch (error) {
                message.error('Failed to fetch user data');
            }
        };
        fetchUserData()
    }, [open, userId]);

    const handleOk = async () => {
        setConfirmLoading(true);

        const updatedUserData = {
            client_name: clientName,
            company_name: companyName,
            contact_person: contactPerson,
            official_email: officialEmail,
            personal_email: personalEmail,
            phone_number: phoneNumber,
            address,
            website_url: websiteUrl,
            industry,
        };

        try {
            const response = await axios.patch(
                `${URL}${UPDATE_USER_INFO_API}/${userId}`,
                updatedUserData,
                authHeaders
            );

            if (response.status === 200) {
                message.success('User information updated successfully');
                // Optionally, call fetchServicePlans() if needed
                setOpen(false);
                getUser()
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to update user information');
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button type="button" onClick={() => setOpen(true)}>
                {icon}
            </Button>
            <Modal
                title="Edit User Information"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Client Name
                    </label>
                    <Input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Company Name
                    </label>
                    <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Contact Person
                    </label>
                    <Input
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Official Email
                    </label>
                    <Input
                        value={officialEmail}
                        onChange={(e) => setOfficialEmail(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Personal Email
                    </label>
                    <Input
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Website URL
                    </label>
                    <Input
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Industry
                    </label>
                    <Input
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>
            </Modal>
        </>
    );
};

export default EditUserInfo;
