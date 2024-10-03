// src/Navbar.jsx
import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { HomeOutlined, BarChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Get token from localStorage

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/login'); // Redirect to login page
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<BarChartOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="3" danger onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="bg-white shadow mt-4">
            <div className="logo" style={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}>
                My Dashboard
            </div>
            <Menu theme="light" mode="horizontal" className="flex justify-end">
                {/* <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item> */}
                {token ? (
                    <>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Avatar
                                style={{ cursor: 'pointer' }}
                                icon={<UserOutlined />}
                                size="large"
                            />
                        </Dropdown>
                    </>
                ) : (
                    <Menu.Item key="login">
                        <Button type="primary" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    </Menu.Item>
                )}
            </Menu>
        </Header>
    );
};

export default Navbar;
