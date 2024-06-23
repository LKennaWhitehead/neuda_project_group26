import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const toAdmin = () => {
        navigate('/admin');
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/submit', {
                name,
                email,
                description
            });
            console.log(response.data.message);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        setSubmitted(true);
    };

    const handleNewTicket = () => {
        setFormData({ name: '', email: '', description: '' });
        setSubmitted(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <button
                style={{
                    alignSelf: 'flex-end',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
                onClick={toAdmin}
            >
                Access Admin
            </button>

            {submitted ? (
                <div>
                    <p>Support ticket successfully submitted!</p>
                    <button onClick={handleNewTicket} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Create New Support Ticket
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
                    <label>
                        Name
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px' }}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px' }}
                        />
                    </label>
                    <label>
                        Description
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px' }}
                        />
                    </label>
                    <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default LoginPage;