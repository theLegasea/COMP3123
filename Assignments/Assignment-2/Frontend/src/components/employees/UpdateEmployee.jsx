import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import '../../css/UpdateEmployee.css'

const INITIAL_EMPLOYEE = {
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    date_of_joining: '',
    department: ''
}

function formatDateForInput(date) {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
}

export default function UpdateEmployee() {
    const {id, employeeId} = useParams();
    const empId = id || employeeId;
    const [employee, setEmployee] = useState(INITIAL_EMPLOYEE);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!empId) return;
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await EmployeeAPI.getEmployeeById(empId);
                const data = res && res.data ? res.data : res;
                setEmployee(prev => ({
                    ...prev,
                    ...data,
                    date_of_joining: formatDateForInput(data.date_of_joining),
                    salary: data.salary ?? prev.salary
                }));
            } catch (err) {
                console.error('Failed to fetch employee:', err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [empId]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: name === 'salary' ? (value === '' ? '' : Number(value)) : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!empId) return;
        EmployeeAPI.updateEmployee(empId, employee)
            .then((response) => {
                console.log('Employee updated successfully:', response.data ?? response);
                navigate('/');
            })
            .catch((error) => {
                console.error('There was an error updating the employee!', error);
            });
    }

    const handleCancel = () => navigate('/');

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-secondary" role="status"
                     style={{width: '1.2rem', height: '1.2rem'}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card update-employee p-3 w-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Update Employee</h3>
                        <small className="text-muted">ID: {empId}</small>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">First Name</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="first_name"
                                value={employee.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Last Name</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="last_name"
                                value={employee.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-sm"
                                name="email"
                                value={employee.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Position</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="position"
                                value={employee.position}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Department</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="department"
                                value={employee.department}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Salary</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="salary"
                                value={employee.salary}
                                onChange={handleInputChange}
                                min="0"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Date of Joining</label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                name="date_of_joining"
                                value={employee.date_of_joining}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-sm btn-primary">
                                Update Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}