import React, {useState, useEffect} from 'react'
import axios from 'axios'
import EmployeeAPI from '../../api/employees/EmployeeAPI'
import {useNavigate} from 'react-router-dom'
import '../../css/EmployeeList.css'

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false);
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const employeeList = await EmployeeAPI.getEmployees();
            setEmployees(employeeList);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        // TODO: debouncing so that this isnt disgusting
        const handleSearch = async () => {
            setLoading(true);
            try {
                const sTerm = (searchTerm || '').trim();
                const result = await EmployeeAPI.employeeSearch(sTerm);
                setEmployees(result || []);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setLoading(false);
            }
        };
        handleSearch();
    }, [searchTerm]);

    const addEmployee = () => {
        navigate('/add-employee');
    }
    const viewEmployee = (employeeId) => {
        navigate(`/view-employee/${employeeId}`);
    }
    const updateEmployee = (employeeId) => {
        navigate(`/update-employee/${employeeId}`);
    }
    const deleteEmployee = (employeeId) => {
        EmployeeAPI.deleteEmployee(employeeId).then(() => {
            fetchEmployees();
        }).catch((error) => {
            console.error('Failed to delete employee:', error);
        });
    }

    return (
        <div className="employee-list card p-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="mb-0">Employee Directory</h3>
                <button className="btn btn-sm btn-outline-primary" onClick={addEmployee}>
                    Add
                </button>
            </div>

            <div className="mb-3">
                <div className="input-group input-group-sm">
                    <input
                        className="form-control form-control-sm"
                        placeholder="Search position or department"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center py-3">
                    <div className="spinner-border text-secondary" role="status"
                         style={{width: '1.2rem', height: '1.2rem'}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : employees.length === 0 ? (
                <div className="text-muted small py-3">No employees found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th style={{width: '200px'}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.first_name} {employee.last_name}</td>
                                <td className="text-muted small">{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="actions">
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => viewEmployee(employee._id)}>View
                                        </button>
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => updateEmployee(employee._id)}>Update
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteEmployee(employee._id)}>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

