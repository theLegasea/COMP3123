import React, {useState} from 'react'
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import {useNavigate} from 'react-router-dom';

const INITIAL_EMPLOYEE = {
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    date_of_joining: '',
    department: ''
}

export default function AddEmployee() {
    const [employee, setEmployee] = useState(INITIAL_EMPLOYEE);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeAPI.createEmployee(employee).then((response) => {
            console.log('Employee added successfully:', response.data);
            setEmployee(INITIAL_EMPLOYEE);
            navigate('/');
        })
            .catch((error) => {
                console.error('There was an error adding the employee!', error);
            });
    }
    const handleCancel = () => navigate('/');

    return (
        <div className="d-flex justify-content-center">
            <div className="card add-employee p-3 w-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Add Employee</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">First Name</label>
                            <input
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
                                className="form-control form-control-sm"
                                name="position"
                                value={employee.position}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Department</label>
                            <input
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
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



