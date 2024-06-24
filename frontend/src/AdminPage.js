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
        <div class="parent">
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex justify-content-end mt-3">
                        <button onClick={() => navigate('/')} type="button" class="btn btn-primary">Return to Ticket Entry</button>
                    </div>
                </div>
            </div>
            <div class="container pt-5">
                <div class="row justify-content-md-center">
                    <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                        <h2 class="mb-4 display-5 text-center">Admin Dashboard</h2>
                        <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                    </div>
                </div>
            </div>
            <div class="mx-5">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
            <div class="mx-5 justify-content-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>



        // <div>
        //     <h1>Admin Page</h1>
        //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        //         <button style={{
        //             alignSelf: 'flex-end',
        //             padding: '10px 20px',
        //             fontSize: '16px',
        //             backgroundColor: '#007BFF',
        //             color: 'white',
        //             border: 'none',
        //             cursor: 'pointer',
        //             marginBottom: '20px'
        //         }} onClick={() => navigate('/')}>Go Back to Ticket Entry</button>
        //         <h2>Submissions</h2>
        //         <ul>
        //             {submissions.map((submission, index) => (
        //                 <li key={index}>
        //                     <strong>Name:</strong> {submission.name}, <strong>Email:</strong> {submission.email}, <strong>Description:</strong> {submission.description}
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>
    );
}

export default AdminPage;