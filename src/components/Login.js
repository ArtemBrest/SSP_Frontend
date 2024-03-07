// Login.js
import React, { useState } from 'react';
import './login.css'; // Подключаем стили

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await onLogin(username, password);

            // Дополнительная логика при успешной авторизации, например, перенаправление на другую страницу.
            console.log('Авторизация успешна:', response);
        } catch (error) {
            console.error('Ошибка входа:', error.message);
            // Дополнительная логика при неудачной авторизации, например, вывод ошибки на экран.
        }
    };

    return (
        <div className="form-container">
            <h2>Форма авторизации</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Имя пользователя:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Пароль:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
