import React, { useState } from 'react';

function ResponseModal({ isOpen, onClose, onSubmit, submission }) {
    const [responseText, setResponseText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(submission.customerId, responseText);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Type your response here..."
                    />
                    <button type="submit">Send Response</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default ResponseModal;