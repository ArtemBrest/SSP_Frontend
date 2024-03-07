// NewDocument.js
import React, { useState } from 'react';
import axios from 'axios';

function NewDocument() {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        axios.post('http://localhost:3000/documents', { DocumentContent: content })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h2>Create New Document</h2>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default NewDocument;
