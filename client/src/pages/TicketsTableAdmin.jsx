import React, { useEffect, useState } from 'react';
import {
    authHeaders,
    GET_ALL_TICKETS_API,
    UPDATE_TICKET_API,
    UPDATE_TICKET_PRIORITY,
    URL,
} from './../constant';
import axios from 'axios';
import { Table, Typography, Select, Modal, Button, Input, message } from 'antd';
import Main from '../components/layout/Main';

const { Title } = Typography;
const { Option } = Select;

const TicketsTableAdmin = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [editedTicket, setEditedTicket] = useState({});
    const [users, setUsers] = useState([]); // Changed from `user` to `users` for clarity

    const userTickets = async () => {
        try {
            const response = await axios.get(
                `${URL}${GET_ALL_TICKETS_API}/`,
                authHeaders
            );
            setTickets(response.data);

            // Extract users data from tickets

            console.log(users)
        } catch (error) {
            console.log("Error fetching tickets:", error);
        }
    };

    const updateTicketPriority = async (id, newPriority) => {
        try {
            await axios.patch(
                `${URL}${UPDATE_TICKET_PRIORITY}/${id}`,
                { priority: newPriority },
                authHeaders
            );
            userTickets();
        } catch (error) {
            console.log("Error updating ticket priority:", error);
        }
    };

    const updateTicket = async () => {
        try {
            await axios.patch(`${URL}${UPDATE_TICKET_API}/${editedTicket._id}`, editedTicket, authHeaders);
            message.success('Ticket updated successfully!');
            setIsEditModalVisible(false);
            userTickets();
        } catch (error) {
            console.log("Error updating ticket:", error);
            message.error('Failed to update ticket.');
        }
    };

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    const showModal = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalVisible(true);
    };

    const handleEditModal = (ticket) => {
        setEditedTicket(ticket);
        setIsEditModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTicket(null);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setEditedTicket({});
    };

    const columns = [
        {
            title: "USER",
            dataIndex: "userId",
            key: "user",
            width: 200,
            render: (userId) => {
                console.log(userId)
                // Assuming userIds is an array and you want to display the username of the first user
                // const username = userId.length > 0 ? userId[0].username : 'Unknown User'; // Handle case if array is empty
                // console.log(userId)
                return (
                    <div className="p-2" >
                        <Title level={5} className="text-base md:text-lg">
                            {userId?.username}
                        </Title>
                    </div >
                );
            },
        },
        {
            title: "SUBJECT",
            dataIndex: "subject",
            key: "subject",
            width: 200,
            render: (subject) => (
                <div className="p-2">
                    <Title level={5} className="text-base md:text-lg">
                        {subject}
                    </Title>
                </div>
            ),
        },
        {
            title: "PRIORITY",
            dataIndex: "priority",
            key: "priority",
            width: 200,
            render: (priority, record) => (
                <div className="p-2">
                    <Select
                        defaultValue={priority}
                        style={{ width: 120 }}
                        onChange={(newPriority) => updateTicketPriority(record._id, newPriority)}
                    >
                        <Option value="Low">Low</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="High">High</Option>
                    </Select>
                </div>
            ),
        },
        {
            title: "CREATED TIME",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            render: (createdAt) => (
                <span className="text-sm md:text-base">
                    {formatDate(createdAt)}
                </span>
            ),
        },
        {
            title: "VIEW",
            key: "view",
            width: 100,
            render: (text, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    View
                </Button>
            ),
        },
        {
            title: "EDIT",
            key: "edit",
            width: 100,
            render: (text, record) => (
                <Button type="primary" onClick={() => handleEditModal(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    useEffect(() => {
        userTickets();
        console.log(tickets)
    }, []);

    return (
        <Main>
            <div className="overflow-x-auto p-4 md:p-6">
                <Table
                    columns={columns}
                    dataSource={tickets}
                    rowKey={(record) => record._id}
                    scroll={{ x: 600 }}
                    className="w-full bg-white rounded-lg shadow-sm"
                />

                <Modal
                    title="Ticket Details"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    {selectedTicket && (
                        <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">
                                <span className="text-gray-600">Subject:</span> {selectedTicket.subject}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-600">Description:</span> {selectedTicket.description}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-600">Priority:</span>
                                <span className={`inline-block ml-2 px-2 py-1 rounded-full ${selectedTicket.priority === 'High' ? 'bg-red-500 text-white' :
                                    selectedTicket.priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
                                    }`}>
                                    {selectedTicket.priority}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-600">Created At:</span> {formatDate(selectedTicket.createdAt)}
                            </p>
                        </div>
                    )}
                </Modal>

                <Modal
                    title="Edit Ticket"
                    visible={isEditModalVisible}
                    onCancel={handleEditCancel}
                    footer={[
                        <Button key="cancel" onClick={handleEditCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={updateTicket}>
                            Update
                        </Button>,
                    ]}
                >
                    {editedTicket && (
                        <div className="space-y-4">
                            <Input
                                placeholder="Subject"
                                value={editedTicket.subject}
                                onChange={(e) => setEditedTicket({ ...editedTicket, subject: e.target.value })}
                            />
                            <Input.TextArea
                                placeholder="Description"
                                value={editedTicket.description}
                                onChange={(e) => setEditedTicket({ ...editedTicket, description: e.target.value })}
                                rows={4}
                            />
                            <Select
                                value={editedTicket.priority}
                                onChange={(newPriority) => setEditedTicket({ ...editedTicket, priority: newPriority })}
                            >
                                <Option value="Low">Low</Option>
                                <Option value="Medium">Medium</Option>
                                <Option value="High">High</Option>
                            </Select>
                        </div>
                    )}
                </Modal>
            </div>
        </Main>
    );
};

export default TicketsTableAdmin;
