// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ClientPage from './pages/ClientPage';
import {AdminPage} from './pages/AdminPage';
import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import {RootPage} from "./pages/RootPage";
import CarsList from "./pages/CarsList";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/client" element={<ClientPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/root" element={<RootPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cars" element={<CarsList />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
