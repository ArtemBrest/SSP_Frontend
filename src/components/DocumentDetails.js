// DocumentDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './document-details.css'; // Подключаем стили

function DocumentDetails() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(userJSON);
    const currentUserID = user.employeeID; // Получаем employeeID из localStorage

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await axios.get(`http://localhost:3031/api/documents/${id}`);
                setDocument(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке документа:', error);
            }
        };

        fetchDocument();
    }, [id]);

    const handleSignDocument = async () => {
        try {
            await axios.post(`http://localhost:3031/api/documents/${id}/sign`);
            // Обновить состояние документа, например, обновить статус
            setDocument(prevDocument => ({
                ...prevDocument,
                DocumentStatus: 'Подписан' // Предполагаем, что статус обновляется после подписания
            }));
        } catch (error) {
            console.error('Ошибка при подписании документа:', error);
        }
    };

    const handleSendForSigning = async () => {
        try {
            await axios.post(`http://localhost:3031/api/documents/${id}/send-for-signing`);
            // Обновить состояние документа, например, обновить статус
            setDocument(prevDocument => ({
                ...prevDocument,
                DocumentStatus: 'На подписи' // Предполагаем, что статус обновляется после отправки на подпись
            }));
        } catch (error) {
            console.error('Ошибка при отправке документа на подпись:', error);
        }
    };

    const handleRejectDocument = async () => {
        try {
            await axios.post(`http://localhost:3031/api/documents/${id}/reject`);
            console.log('Документ успешно отклонен');
            // Обновить состояние документа или выполнить другие необходимые действия после отклонения
        } catch (error) {
            console.error('Ошибка при отклонении документа:', error);
        }
    };

    if (loading) {
        return <div className="document-details-container">Загрузка...</div>;
    }

    if (!document) {
        return <div className="document-details-container not-found-message">Документ не найден</div>;
    }

    return (
        <div className="document-details-container">
            <h2 className="document-details-heading">Document Details: {document.DocumentID}</h2>
            <div className="document-details-table">
                <div className="document-details-row">
                    <div className="document-details-cell-label">Тип документа:</div>
                    <div className="document-details-cell-value">{document.DocumentType}</div>
                </div>
                <div className="document-details-row">
                    <div className="document-details-cell-label">Отправитель:</div>
                    <div className="document-details-cell-value">{document.SenderUser}</div>
                </div>
                <div className="document-details-row">
                    <div className="document-details-cell-label">Получатель:</div>
                    <div className="document-details-cell-value">{document.ReceiverUser}</div>
                </div>
                <div className="document-details-row">
                    <div className="document-details-cell-label">Статус:</div>
                    <div className="document-details-cell-value">{document.DocumentStatus}</div>
                </div>
                <div className="document-details-row">
                    <div className="document-details-cell-label">Содержание:</div>
                    <div className="document-details-cell-value">{document.DocumentContent}</div>
                </div>
                <div className="document-details-row">
                    <div className="document-details-cell-label">Дата создания:</div>
                    <div className="document-details-cell-value">{new Date(document.CreationDate).toLocaleString()}</div>
                </div>
            </div>
            {currentUserID === document.SenderUserID && document.DocumentStatus === 'В обработке' && (
                <div className="document-action-buttons">
                    <button className="document-action-button" onClick={handleSendForSigning}>Отправить на подпись</button>
                    <button className="document-action-button" onClick={handleSignDocument}>Подписать</button>
                </div>
            )}
            {currentUserID === document.ReceiverUserID && document.DocumentStatus === 'В ожидании подписи' && (
                <div className="document-action-buttons">
                    <button className="document-action-button" onClick={handleSignDocument}>Подписать</button>
                    <button className="document-action-button" onClick={handleRejectDocument}>Отклонить</button>
                </div>
            )}
        </div>
    );
}

export default DocumentDetails;
