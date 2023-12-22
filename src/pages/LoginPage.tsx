import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import axios from 'axios';
import {useAuth} from '../AuthContext';
import {useNavigate} from 'react-router-dom';

export function LoginPage() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:5050/api/auth/signin', {
                email: values.username,
                password: values.password,
            });

            const authToken = response.data.token;
            login(authToken);

            console.log('Authentication successful:', response.data);

            // Переход на другую страницу
            const userRole = response.data.role[0]; // предполагается, что роль - это массив и берется первый элемент

            // Определяем, на какую страницу перейти в зависимости от роли
            switch (userRole) {
                case 'CLIENT':
                    navigate('/client');
                    break;
                case 'MANAGER':
                    navigate('/admin');
                    break;
                case 'SUPERVISOR':
                    navigate('/root');
                    break;
                // Добавьте другие роли по мере необходимости
                default:
                    console.error('Unknown role:', userRole);
                // Обработка неизвестной роли
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            // Обработка ошибки аутентификации
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form max-w-sm mx-auto mt-10"
            initialValues={{remember: true}}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    placeholder="Username"
                    className="w-full"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                    className="w-full"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="default" htmlType="submit" className="login-form-button w-full">
                    Log in
                </Button>
                Or <a href="/register">register now!</a>
            </Form.Item>
        </Form>
    );
}
