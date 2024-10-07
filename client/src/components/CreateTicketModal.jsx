import React, { useState } from 'react';
import { Button, Modal, Input, Select, message, Upload } from 'antd';
import { authHeaders, SUBMIT_TICKET_API, URL } from '../constant'; // Adjust API constants as necessary
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const CreateTicketModal = ({ userTicketsCall }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    // Form fields
    const [requestType, setRequestType] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleOk = async () => {
        setConfirmLoading(true);

        const ticketData = {
            request_type: requestType,
            subject,
            description,
            priority,
            attachments: fileList?.map(file => file.originFileObj) // Get file objects for upload
        };

        try {
            console.log('ticketData', ticketData)
            const response = await axios.post(`${URL}${SUBMIT_TICKET_API}`, ticketData, authHeaders);
            console.log(response?.data)
            if (response.status === 201) {
                message.success('Your request has been submitted successfully');
                setOpen(false);
                // Optionally, reset the form
                resetForm();
                userTicketsCall()
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to submit the request');
        } finally {
            setConfirmLoading(false);
        }
    };

    const resetForm = () => {
        setRequestType('');
        setSubject('');
        setDescription('');
        setPriority('Medium');
        setFileList([]);
    };

    const handleCancel = () => setOpen(false);

    return (
        <>
            <div className='flex justify-end items-center'>
                <Button type="button" onClick={() => setOpen(true)}>
                    Create Ticket
                </Button>
            </div>
            <Modal
                title="Submit a New Request"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Request Type</label>
                    <Select
                        value={requestType}
                        onChange={setRequestType}
                        className="w-full border-gray-300 rounded-md"
                        placeholder="Select a request type"
                    >
                        <Option value="Technical Issue">Technical Issue</Option>
                        <Option value="Billing">Billing</Option>
                        <Option value="General Inquiry">General Inquiry</Option>
                    </Select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border-gray-300 rounded-md"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <Select
                        value={priority}
                        onChange={setPriority}
                        className="w-full border-gray-300 rounded-md"
                    >
                        <Option value="Low">Low</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="High">High</Option>
                    </Select>
                </div>

                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Attachments</label>
                    <Upload
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        beforeUpload={() => false} // Prevent automatic upload
                    >
                        <Button type="button">Upload Files</Button>
                    </Upload>
                </div> */}
            </Modal>
        </>
    );
};

export default CreateTicketModal;
