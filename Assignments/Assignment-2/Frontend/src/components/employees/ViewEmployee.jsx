import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import '../../css/ViewEmployee.css'

export default function ViewEmployee() {
    const {employeeId} = useParams();
    const [employee, setEmployee] = useState(null);
    const getEmployeeDetails = async (employeeId) => {
        try {
            const employeeDetails = await EmployeeAPI.getEmployeeById(employeeId);
            setEmployee(employeeDetails);
            console.log('Employee Details:', employeeDetails);
        } catch (error) {
            console.error('Failed to fetch employee details:', error);
        }
    }

    useEffect(() => {
        getEmployeeDetails(employeeId);
    }, [employeeId]);
    return (
        <div className="d-flex justify-content-center">
            <div className="card view-employee p-3 w-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h3 className="mb-0">Employee Details</h3>
                        <small className="text-muted">ID: {employeeId}</small>
                    </div>

                    {employee ? (
                        <div className="row g-2">
                            <div className="col-12">
                                <div className="fw-semibold">Name</div>
                                <div className="text-muted">{employee.first_name} {employee.last_name}</div>
                            </div>

                            <div className="col-12">
                                <div className="fw-semibold">Email</div>
                                <div className="text-muted">{employee.email}</div>
                            </div>

                            <div className="col-12">
                                <div className="fw-semibold">Position</div>
                                <div className="text-muted">{employee.position}</div>
                            </div>

                            <div className="col-12">
                                <div className="fw-semibold">Department</div>
                                <div className="text-muted">{employee.department}</div>
                            </div>

                            <div className="col-12">
                                <div className="fw-semibold">Salary</div>
                                <div className="text-muted">{employee.salary}</div>
                            </div>

                            <div className="col-12">
                                <div className="fw-semibold">Date of Joining</div>
                                <div className="text-muted">{employee.date_of_joining}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center py-3">
                            <div className="spinner-border text-secondary" role="status" style={{width: '1.2rem', height: '1.2rem'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
