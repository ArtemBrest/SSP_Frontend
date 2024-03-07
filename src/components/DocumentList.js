// DocumentList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './document-list.css'; // Подключаем стили

function DocumentList() {
    const [documents, setDocuments] = useState([]);
    const [newDocumentTitle, setNewDocumentTitle] = useState('');
    const [newDocumentContent, setNewDocumentContent] = useState('');

    useEffect(() => {
        // Функция для загрузки документов при загрузке компонента
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:3031/api/documents');
            setDocuments(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке документов:', error);
        }
    };

    const handleCreateDocument = async () => {
        try {
            const response = await axios.post('http://localhost:3031/api/documents', {
                title: newDocumentTitle,
                content: newDocumentContent
            });
            console.log('Новый документ создан:', response.data);
            setNewDocumentTitle('');
            setNewDocumentContent('');
            loadDocuments(); // После создания документа обновляем список
        } catch (error) {
            console.error('Ошибка при создании документа:', error);
        }
    };

    return (
        <div className="document-list-container">
            <h2 className="document-list-header">Documents</h2>
            <div>
                <h2 className="document-list-caption">Список документов</h2>
                <table className="document-list-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тип документа</th>
                        <th>Отправитель</th>
                        <th>Получатель</th>
                        <th>Статус</th>
                        <th>Содержание</th>
                        <th>Дата создания</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map(document => (
                        <tr key={document.DocumentID}>
                            <td><Link to={`/documents/${document.DocumentID}`}>{document.DocumentID}</Link></td>
                            <td>{document.DocumentType}</td>
                            <td>{document.SenderUser}</td>
                            <td>{document.ReceiverUser}</td>
                            <td>{document.DocumentStatus}</td>
                            <td>{document.DocumentContent}</td>
                            <td>{new Date(document.CreationDate).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="document-list-create-form">
                <h3>Создать новый документ</h3>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={newDocumentTitle}
                    onChange={e => setNewDocumentTitle(e.target.value)}
                />
                <textarea
                    placeholder="Содержимое"
                    value={newDocumentContent}
                    onChange={e => setNewDocumentContent(e.target.value)}
                ></textarea>
                <button onClick={handleCreateDocument}>Создать</button>
            </div>
        </div>
    );
}

export default DocumentList;
