import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Modal, Button, Input, Form, message, Tooltip } from 'antd';
import Main from './../components/layout/Main';
import { authHeaders, URL, GET_ALL_USERS_API, DELETE_USER_API, UPDATE_USER_API } from '../constant';

const { Title } = Typography;

const AllUserList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${URL}${GET_ALL_USERS_API}/`, authHeaders);
            console.log(response.data.users)
            setUsers(Array.isArray(response.data.users) ? response.data.users : []);
            setLoading(false)
        } catch (error) {
            console.log("Error fetching users:", error);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${URL}${DELETE_USER_API}/${id}`, authHeaders);
            message.success("User deleted successfully");
            fetchUsers(); // Refresh users list after deletion
        } catch (error) {
            console.log("Error deleting user:", error);
            message.error("Error deleting user");
        }
    };

    // Update user
    const updateUser = async (values) => {
        try {
            console.log("Updating user with values:", values); // Debug log
            await axios.patch(`${URL}${UPDATE_USER_API}/${selectedUser._id}`, values, authHeaders);
            message.success("User updated successfully");
            fetchUsers(); // Refresh users list after update
            handleCancel(); // Reset the modal state after updating
        } catch (error) {
            console.log("Error updating user:", error);
            message.error("Error updating user");
        }
    };

    // Function to show view modal
    const showViewModal = (record) => {
        setSelectedUser(record); // Set user for viewing
        setIsModalVisible(true); // Open modal
        setIsUpdateMode(false); // Not in update mode
    };

    // Function to show update modal
    const showUpdateModal = (record) => {
        setSelectedUser(record); // Set user for updating
        setIsModalVisible(true); // Open modal
        setIsUpdateMode(true); // In update mode
    };

    // Cancel handler to reset states
    const handleCancel = () => {
        setIsModalVisible(false); // Close modal
        setSelectedUser(null); // Reset selected user
        setIsUpdateMode(false); // Reset update mode

        console.log("After cancel:", {
            isModalVisible,
            selectedUser,
            isUpdateMode
        });
    };


    const columns = [
        {
            title: "Client Name",
            dataIndex: "client_name",
            key: "client_name",
            width: 200,
            render: (client_name) => (
                <div className="p-2">
                    <Title level={5} className="text-base md:text-lg">
                        {client_name}
                    </Title>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "official_email",
            key: "official_email",
            width: 200,
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
            width: 200,
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (text, record) => (
                <div className="space-x-2">
                    <Tooltip title="View Client">
                        <Button type="primary" onClick={() => showViewModal(record)}>
                            View
                        </Button>
                    </Tooltip>
                    <Tooltip title="Update Client">
                        <Button type="default" onClick={() => showUpdateModal(record)}>
                            Update
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete Client">
                        <Button type="danger" onClick={() => deleteUser(record._id)}>
                            Delete
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];


    return (
        <Main loading={loading}>
            <div className="overflow-x-auto p-4 md:p-6">
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey={(record) => record._id}
                    loading={loading}
                    scroll={{ x: 600 }}
                    className="w-full bg-white rounded-lg shadow-sm"
                    pagination={{ pageSize: 10 }}
                />

                <Modal
                    title={isUpdateMode ? "Update User" : "User Details"}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >

                    {/* 
                    <Modal
                        title={isUpdateMode ? "Update User" : "User Details"}
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    > */}
                    {selectedUser && (
                        isUpdateMode ? (
                            <Form
                                layout="vertical"
                                initialValues={selectedUser}
                                onFinish={updateUser}
                            >
                                <Form.Item
                                    label="Client Name"
                                    name="client_name"
                                    rules={[{ required: true, message: 'Please enter client name' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Company Name"
                                    name="company_name"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Official Email"
                                    name="official_email"
                                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Phone Number"
                                    name="phone_number"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Industry"
                                    name="industry"
                                >
                                    <Input />
                                </Form.Item>

                                <Button type="primary" htmlType="submit">Update</Button>
                            </Form>
                        ) : (
                            <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-600">Client Name:</span> {selectedUser.client_name}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-600">Company Name:</span> {selectedUser.company_name || 'N/A'}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-600">Email:</span> {selectedUser.official_email}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-600">Phone Number:</span> {selectedUser.phone_number || 'N/A'}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-600">Address:</span> {selectedUser.address || 'N/A'}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-600">Industry:</span> {selectedUser.industry || 'N/A'}
                                </p>
                            </div>
                        )
                    )}
                </Modal>
            </div>
        </Main>
    );
};

export default AllUserList;
