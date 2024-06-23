import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/submit');
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                <button style={{
                    alignSelf: 'flex-end',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }} onClick={() => navigate('/')}>Go Back to Ticket Entry</button>
                <h2>Submissions</h2>
                <ul>
                    {submissions.map((submission, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {submission.name}, <strong>Email:</strong> {submission.email}, <strong>Description:</strong> {submission.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminPage;