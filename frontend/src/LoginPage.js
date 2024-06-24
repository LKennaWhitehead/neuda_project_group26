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
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex justify-content-end mt-3">
                        <button onClick={toAdmin} type="button" class="btn btn-primary">Access Admin</button>
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
                    <section class="bg-light py-3 py-md-5">
                        <div class="container">
                            <div class="row justify-content-md-center">
                                <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                                    <h2 class="mb-4 display-5 text-center">Ticket Submission</h2>
                                    <p class="text-secondary mb-5 text-center">Welcome to our Web Application! Easily submit your problem tickets and receive timely support from our dedicated team. Just describe your issue, and we'll handle the rest to ensure a quick resolution.</p>
                                    <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                                </div>
                            </div>
                        </div>

                        <div class="container">
                            <div class="row justify-content-lg-center">
                                <div class="col-12 col-lg-9">
                                    <div class="bg-white border rounded shadow-sm overflow-hidden">

                                        <form onSubmit={handleSubmit} action="#!">
                                            <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
                                                <div class="col-12">
                                                    <label for="name" class="form-label"> Name <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div class="col-12 col-md-12">
                                                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <span class="input-group-text">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                            </svg>
                                                        </span>
                                                        <input type="email" class="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                </div>
                                                <div class="col-12">
                                                    <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                                                    <textarea class="form-control" id="description" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                                                </div>
                                                <div class="col-12">
                                                    <div class="d-grid">
                                                        <button class="btn btn-primary btn-lg" type="submit">Submit</button>
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







        // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        //     <button
        //         style={{
        //             alignSelf: 'flex-end',
        //             padding: '10px 20px',
        //             fontSize: '16px',
        //             backgroundColor: '#007BFF',
        //             color: 'white',
        //             border: 'none',
        //             cursor: 'pointer',
        //             marginBottom: '20px'
        //         }}
        //         onClick={toAdmin}
        //     >
        //         Access Admin
        //     </button>

        //     {submitted ? (
        //         <div>
        //             <p>Support ticket successfully submitted!</p>
        //             <button onClick={handleNewTicket} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
        //                 Create New Support Ticket
        //             </button>
        //         </div>
        //     ) : (
        //         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
        //             <label>
        //                 Name
        //                 <input
        //                     type="text"
        //                     placeholder="Name"
        //                     value={name}
        //                     onChange={(e) => setName(e.target.value)}
        //                     style={{ padding: '10px', fontSize: '16px' }}
        //                 />
        //             </label>
        //             <label>
        //                 Email
        //                 <input
        //                     type="email"
        //                     placeholder="Email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     style={{ padding: '10px', fontSize: '16px' }}
        //                 />
        //             </label>
        //             <label>
        //                 Description
        //                 <textarea
        //                     placeholder="Description"
        //                     value={description}
        //                     onChange={(e) => setDescription(e.target.value)}
        //                     style={{ padding: '10px', fontSize: '16px' }}
        //                 />
        //             </label>
        //             <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
        //                 Submit
        //             </button>
        //         </form>
        //     )}
        // </div>


    );
}

export default LoginPage;