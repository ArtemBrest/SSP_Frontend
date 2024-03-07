import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import DocumentList from './components/DocumentList';
import DocumentDetails from './components/DocumentDetails';
import NewDocument from './components/NewDocument';
import Login from './components/Login';

const App = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);
    const [ setErrorMessage] = useState('');

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3031/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            // Явное указание ESLint, что setErrorMessage определена внутри функции
            // eslint-disable-next-line no-undef
            setErrorMessage(error.message || 'Что-то пошло не так');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    console.log(user)

    return (
        <Router>
            {user ? (
                <div>
                    <Navigation onLogout={handleLogout} />
                    <Routes>
                        <Route path="/documents" element={<DocumentList/>} />
                        <Route path="/documents/new" element={<NewDocument/>} />
                        <Route path="/documents/:id" element={<DocumentDetails/>} />
                        <Route path="/login" element={<Login/>} />
                    </Routes>
                </div>
            ) : (
                <Login onLogin={handleLogin} setErrorMessage={setErrorMessage} />
            )}
        </Router>
    );
};

export default App;
