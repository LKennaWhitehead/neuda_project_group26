import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [dropdown, setDropdown] = useState('All');

    const dummySubmissions = [
        {
            status: 'New',
            name: 'John Doe',
            email: 'john.doe@example.com',
            description: 'Issue with login',
            createdAt: '2023-04-01',
            updatedAt: '2023-04-01',
        },
        {
            status: 'In Progress',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            description: 'Page not loading',
            createdAt: '2023-04-02',
            updatedAt: '2023-04-03',
        },
        {
            status: 'Resolved',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            description: 'Typo in documentation',
            createdAt: '2023-04-04',
            updatedAt: '2023-04-05',
        },
    ];

    const [filteredSubmissions, setFilteredSubmissions] = useState(dummySubmissions);

    useEffect(() => {
        // TEMPERARELY COMMENTED OUT UNTIL BACKEND IS READY



        // const fetchData = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:3001/submit');
        //         setSubmissions(response.data);
        //         // Initially display all submissions
        //         setFilteredSubmissions(response.data);
        //     } catch (error) {
        //         console.error('Error fetching submissions:', error);
        //     }
        // };
        // fetchData();
    }, []);

    useEffect(() => {
        if (dropdown === 'All') {
            setFilteredSubmissions(dummySubmissions);
        } else {
            const filtered = dummySubmissions.filter(submission => submission.status === dropdown);
            setFilteredSubmissions(filtered);
        }
    }, [dropdown, submissions]);

    const handleDropdown = (choice) => {
        setDropdown(choice);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return 'hsl(0, 100%, 75%)';
            case 'In Progress':
                return 'hsl(60, 100%, 75%)';
            case 'Resolved':
                return 'hsl(120, 100%, 75%)';
            default:
                return 'none';
        }
    };

    return (
        <div className="parent">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end mt-3">
                        <button onClick={() => navigate('/')} type="button" className="btn btn-primary">Return to Ticket Entry</button>
                    </div>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                        <h2 className="mb-4 display-5 text-center">Admin Dashboard</h2>
                        <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                    </div>
                </div>
            </div>
            <div className="mx-5 pb-3">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {dropdown}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={() => handleDropdown('All')}>All</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleDropdown('New')}>New</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleDropdown('In Progress')}>In Progress</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleDropdown('Resolved')}>Resolved</a></li>
                    </ul>
                </div>
            </div>
            <div className="mx-5 justify-content-center">
                <table className="table rounded-3 border">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created At  <i className="bi bi-arrow-down-up"></i></th>
                            <th scope="col">Updated At</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((submission, index) => (
                            <tr key={index}>
                                <td style={{ backgroundColor: getStatusColor(submission.status) }}>{submission.status}</td>
                                <td>{submission.name}</td>
                                <td>{submission.email}</td>
                                <td>{submission.description}</td>
                                <td>{submission.createdAt}</td>
                                <td>{submission.updatedAt}</td>
                                <td><i class="bi bi-three-dots"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;