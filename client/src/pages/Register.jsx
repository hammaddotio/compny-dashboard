import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button, DatePicker, Row, Col, Card, message, Typography } from 'antd';
import axios from 'axios';
import { REGISTER_URL, URL } from '../constant';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;

const Register = ({ isLoggedIn }) => { // Accept isLoggedIn as a prop
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const formData = {
            salutation: values.salutation,
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            email: values.email,
            phone_number: values.phone,
            password: values.password,
            birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
            country: values.country,
            referral: values.referral,
        };

        try {
            setLoading(true);
            const response = await axios.post(`${URL}${REGISTER_URL}`, formData);
            message.success('Form submitted successfully!');
            console.log('Success:', response.data);
            navigate('/login');
        } catch (error) {
            message.error('Submission failed. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoggedIn) { // Conditional rendering for logged-in users
        return (
            <Card style={{ width: '80%', margin: 'auto', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Title level={3}>Welcome Back!</Title>
                <Text>You are already logged in. Click the button below to proceed to your dashboard.</Text>
                <Button type="primary" style={{ marginTop: '20px' }} onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                </Button>
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Or click <a onClick={() => navigate('/login')}>here</a> to log out.
                </Text>
            </Card>
        );
    }

    return (
        <Card style={{ width: '80%', margin: 'auto', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2}>Create Your Account</Title>
            <Form
                name="userForm"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ remember: true }}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Mr." name="salutation">
                            <Select placeholder="Select an option">
                                <Option value="mr">Mr.</Option>
                                <Option value="mrs">Mrs.</Option>
                                <Option value="miss">Miss</Option>
                                <Option value="ms">Ms.</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your first name!' }]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your last name!' }]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Cell Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Verify Password"
                            name="verifyPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Birthday" name="birthday">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Street"
                            name="street"
                            rules={[{ required: true, message: 'Please input your street!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your city!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="State"
                            name="state"
                            rules={[{ required: true, message: 'Please input your state!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Zip"
                            name="zip"
                            rules={[{ required: true, message: 'Please input your zip code!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Select Country"
                            name="country"
                            rules={[{ required: true, message: 'Please select your country!' }]}>
                            <Select placeholder="Select a country">
                                <Option value="us">United States</Option>
                                <Option value="uk">United Kingdom</Option>
                                <Option value="ca">Canada</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="How did you get to know about us?"
                            name="referral">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item valuePropName="checked">
                            <Checkbox> I Agree to the User Agreement</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Already have an account? Click <a onClick={() => navigate('/login')}>here</a> to log in.
                </Text>
            </Form>
        </Card>
    );
};

export default Register;
