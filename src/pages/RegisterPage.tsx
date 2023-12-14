import React from 'react';
import {Button, Form, Input, message, Select} from 'antd';
import axios from "axios";

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export function RegisterPage() {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:5050/api/auth/signup', values);
            console.log('Registration successful:', response.data);
            message.success('Registration successful');
        } catch (error) {
            console.error('Registration failed:', error);
            message.error('Registration failed');
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="86">+7</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '+7'}}
            style={{maxWidth: 600}}
            scrollToFirstError
            className="max-w-md mx-auto mt-10"
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not a valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Last Name!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{required: true, message: 'Please input your phone number!'}]}
            >
                <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="default" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}
