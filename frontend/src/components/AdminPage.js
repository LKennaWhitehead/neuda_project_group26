import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [dropdown, setDropdown] = useState('All');
    const [searchByName, setSearchByName] = useState('');
    const [searchByEmail, setSearchByEmail] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [responseText, setResponseText] = useState('');

    const handleRespondClick = (submissionId) => {
        setSelectedSubmissionId(submissionId);
        setIsModalVisible(true);
    };

    const handleSubmitResponse = async () => {
        try {
            await axios.post(`http://localhost:8080/employee{$customerId}/answer`, {
                submissionId: selectedSubmissionId,
                response: responseText,
            });
            // Handle success (e.g., show a success message, refresh data)
        } catch (error) {
            console.error('Error sending response:', error);
            // Handle error (e.g., show an error message)
        } finally {
            setIsModalVisible(false);
            setResponseText('');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching submissions
                const submissionsResponse = await axios.get('http://localhost:8080/customer');
                setSubmissions(submissionsResponse.data);
                setFilteredSubmissions(submissionsResponse.data);

                // Fetching questions and their statuses
                const questionsResponse = await axios.get('http://localhost:8080/employee/questions');
                const questionsData = questionsResponse.data;

                const combinedData = submissionsResponse.data.map(submission => {
                    const questionDetails = questionsData.find(q => q.submissionId === submission.id);
                    return {
                        ...submission,
                        question: questionDetails?.question,
                        status: questionDetails?.status
                    };
                });

                setSubmissions(combinedData);
                setFilteredSubmissions(combinedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = submissions;
        if (dropdown !== 'All') {
            filtered = filtered.filter(submission => submission.status === dropdown);
        }
        if (searchByName) {
            filtered = filtered.filter(submission => submission.name.toLowerCase().includes(searchByName.toLowerCase()));
        }
        if (searchByEmail) {
            filtered = filtered.filter(submission => submission.email.toLowerCase().includes(searchByEmail.toLowerCase()));
        }
        setFilteredSubmissions(filtered);
    }, [dropdown, searchByName, searchByEmail, submissions]);

    const handleDropdown = (choice) => {
        setDropdown(choice);
    };

    return (
        <div className="parent background-image d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
            <div className="ticket-button-container position-absolute top-0 end-0 pt-4 pe-4">
                <button onClick={() => navigate('/')} type="button" className="btn btn-primary text-white shadow-lg rounded-5">Return to Ticket Entry</button>
            </div>
            <div className="content-container w-100 d-flex flex-column align-items-stretch justify-content-center p-5 rounded-3">
                <div className="header-div border custom-border p-2">
                    <h2 className="text-white">Submitted Tickets</h2>
                </div>
                <div className="nav-container pb-3 pt-3">
                    <nav className="navbar bg-white rounded-3 p-1">
                        <form className="container-fluid">
                            <div className="row form-row align-items-center">
                                <div className="col d-flex justify-content-start">
                                    <div className="dropdown">
                                        <button className="btn btn-primary rounded-5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {dropdown}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDropdown('All') }}>All</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDropdown('In Progress') }}>In Progress</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDropdown('Resolved') }}>Resolved</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon2" />
                                </div>
                                <div className="pagination-container col-md-3 justify-content-end pt-3">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </form>
                    </nav>
                </div>
                <table className="table table-striped table-border custom-rounded">
                    <thead>
                        <tr>
                            <th scope="col">STATUS</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PROBLEM</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((submission, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    <div className={`alert ${submission.status === 'Resolved' ? 'alert-success' : submission.status === 'In Progress' ? 'alert-warning' : 'alert-primary'} d-flex justify-content-center p-1`} role="alert">
                                        {submission.status}
                                    </div>
                                </th>
                                <td>{submission.name}</td>
                                <td>{submission.email}</td>
                                <td>{submission.question}</td>
                                <td className="p-3">
                                    <div className="dropdown">
                                        <button className="btn btn-primary rounded-5" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleRespondClick(submission.id)}>
                                            RESPOND
                                        </button>

                                        {isModalVisible && (
                                            <div className="modal">
                                                <input type="text" value={responseText} onChange={(e) => setResponseText(e.target.value)} />
                                                <button onClick={handleSubmitResponse}>Submit</button>
                                                <button onClick={() => setIsModalVisible(false)}>Close</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default AdminPage;