import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import {User} from "../models";
import {useAuth} from "../AuthContext";

interface AdminPageProps {}

export function AdminPage({}: AdminPageProps) {
    const [users, setUsers] = useState<User[]>([]);
    const {token} = useAuth();


    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        axios.get<User[]>('http://localhost:5050/api/admin/all')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [token]); // Пустой массив зависимостей означает, что useEffect будет выполняться только при монтировании компонента

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
    ];

    return <Table dataSource={users} columns={columns} rowKey={(user) => user.id} />;
}
