import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { FaTicketAlt } from 'react-icons/fa'; // Import icon from react-icons -> cd frontend , npm install react-icons

function SubmitPage() {
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
        <div className="bg-powder-blue">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end mt-3">
                        <button onClick={toAdmin} type="button" className="btn btn-navy">Access Admin</button>
                    </div>
                </div>
            </div>
            {
                submitted ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <div>
                            <div className="alert alert-primary" role="alert">
                                Ticket successfully submitted!
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={handleNewTicket} type="button" className="btn btn-primary mt-3">Create New Support Ticket</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <section className="bg-powder-blue py-3 py-md-5">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                                    <h2 className="mb-4 display-5 text-center text-navy">
                                        <FaTicketAlt className="header-icon" />
                                        Ticket Submission
                                    </h2>
                                    <p className="text-secondary mb-5 text-center">Welcome to our Web Application! Easily submit your problem tickets and receive timely support from our dedicated team. Just describe your issue, and we'll handle the rest to ensure a quick resolution.</p>
                                    <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row justify-content-lg-center">
                                <div className="col-12 col-lg-9">
                                    <div className="bg-white text-navy border rounded shadow-sm overflow-hidden">

                                        <form onSubmit={handleSubmit} action="#!">
                                            <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                                                <div className="col-12">
                                                    <label htmlFor="name" className="form-label"> Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div className="col-12 col-md-12">
                                                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                            </svg>
                                                        </span>
                                                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="description" className="form-label">Description <span className="text-danger">*</span></label>
                                                    <textarea className="form-control" id="description" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    );
}

export default SubmitPage;
