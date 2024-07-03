import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';
import ResponseModal from './ResponseModal';

function AdminPage() {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [dropdown, setDropdown] = useState('All');
    const [searchByName, setSearchByName] = useState('');
    const [searchByEmail, setSearchByEmail] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);

    // Calculate total pages
    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

    // Calculate the index of the first and last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Current page items
    const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

    // Change page function
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSendResponseClick = (submission) => {
        setCurrentSubmission(submission);
        setIsResponseModalOpen(true);
        console.log('Send response clicked:', submission);
    };

    const handleCloseModal = () => {
        setIsResponseModalOpen(false);
        setCurrentSubmission(null);
    };

    const handleSubmitResponse = async (submissionId, responseText) => {
        try {
            const questionText = currentSubmission.question;
            // Including both questionText and answer as query parameters
            const url = `http://localhost:8080/employee/${submissionId}/answer?questionText=${encodeURIComponent(questionText)}&answer=${encodeURIComponent(responseText)}`;

            await axios.post(url);
            // Handle success here
            window.location.reload();
        } catch (error) {
            console.error('Error sending response:', error);
            // Handle error here
        } finally {
            handleCloseModal();
        }

        console.log('Submitting response:', submissionId, responseText);
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
                    const questionDetails = questionsData.find(q => q.questionerId === submission.customerId);
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
        setCurrentPage(1); // Reset to first page whenever filters change
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
                    <h2 className="text-white ">Submitted Tickets</h2>
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
                                    <input type="text" className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" value={searchByName} onChange={(e) => setSearchByName(e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon2" value={searchByEmail} onChange={(e) => setSearchByEmail(e.target.value)} />
                                </div>
                                <div className="pagination-container col-md-3 justify-content-end pt-3">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage - 1); }}>Previous</a>
                                            </li>
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage + 1); }}>Next</a>
                                            </li>
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
                        {currentItems.map((submission, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    <div className={`alert ${submission.status === 'Solved' ? 'alert-success' : submission.status === 'In Progress' ? 'alert-warning' : 'alert-primary'} d-flex justify-content-center p-1`} role="alert">
                                        {submission.status}
                                    </div>
                                </th>
                                <td>{submission.name}</td>
                                <td>{submission.email}</td>
                                <td>{submission.question}</td>
                                <td className="p-3">
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#" onClick={() => handleSendResponseClick(submission)}>Send Response</a></li>
                                            {/* Other dropdown items */}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <ResponseModal
                            isOpen={isResponseModalOpen}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmitResponse}
                            submission={currentSubmission}
                        />
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default AdminPage;