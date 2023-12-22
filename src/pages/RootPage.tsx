import React, { useState, useEffect } from "react";
import { Table, Space, Tag, Select } from "antd";
import axios from "axios";
import { User } from "../models";
import { useAuth } from "../AuthContext";

const { Option } = Select;

const RoleCell: React.FC<{ roles: string[]; userId: number }> = ({ roles, userId }) => {
    const [selectedRoles, setSelectedRoles] = useState<string[]>(roles);

   const handleRoleChange = (newSelectedRoles: string[]) => {
        console.log("Selected Roles:", newSelectedRoles);

        axios.put(
            `http://localhost:5050/api/admin/${userId}/roles`,
            { roles: [newSelectedRoles] },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => {
                console.log(response.data);
                setSelectedRoles(newSelectedRoles);
            })
            .catch(error => {
                console.error('Error updating user roles:', error);
                // Добавьте обработку ошибок, например, уведомления для пользователя
            });
   }; 

    return (
        <Select
            style={{ width: '100%' }}
            placeholder="Select roles"
            onChange={handleRoleChange}
            value={selectedRoles}
        >
            <Option value="CLIENT">Client</Option>
            <Option value="MANAGER">Manager</Option>
            <Option value="ADMIN">Admin</Option>
        </Select>
    );
};

interface AdminPageProps {}

export function RootPage({}: AdminPageProps) {
    const [users, setUsers] = useState<User[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        axios.get<User[]>('http://localhost:5050/api/admin/all')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [token]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Last Name', dataIndex: 'lastname', key: 'lastname' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: string[], record: User) => <RoleCell roles={roles} userId={record.id} />,
        },
    ];

    return <Table dataSource={users} columns={columns} rowKey={(user) => user.id} />;
}
