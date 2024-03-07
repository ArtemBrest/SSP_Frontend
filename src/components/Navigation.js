// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'; // Подключаем стили

const Navigation = ({ onLogout }) => {
    return (
        <section className="navigation">
            <div className="container">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <Link className="navigation__link" to="/documents">Document List</Link>
                    </li>
                    <li className="navigation__item">
                        <Link className="navigation__link" to="/documents/new">New Document</Link>
                    </li>
                </ul>
                <button className="btn-primary" onClick={onLogout}>Logout</button>
            </div>
        </section>
    );
};

export default Navigation;
