import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { LOGIN_URL, URL } from './../constant';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // Prepare login data to send in the API request
        const loginData = {
            username: values.username,
            password: values.password,
        };

        try {
            setLoading(true);
            // Make the API call using Axios
            const response = await axios.post(`${URL}${LOGIN_URL}`, loginData);
            message.success('Login successful!');
            console.log('Success:', response.data);
            // Handle successful login (e.g., redirect, store token)
            localStorage.setItem('token', response.data?.token);
            navigate('/dashboard');
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Card
                style={{
                    width: '70%', // Set the width to 70%
                    padding: '20px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login to Your Account</h2>
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ color: '#666' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#1890ff', fontWeight: 'bold' }}>
                            Register here
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
