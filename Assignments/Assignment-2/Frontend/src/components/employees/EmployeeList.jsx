import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EmployeeAPI from '../../api/employees/EmployeeAPI'
import { useNavigate } from 'react-router-dom'
// import AddEmployee from './AddEmployee';

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([])
    const fetchEmployees = async () => {
        try {
            const employeeList = await EmployeeAPI.getEmployees();
            setEmployees(employeeList);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, [])

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
    <div>
        <h3>Employees List</h3>
        <table border="1" cellPadding="5">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Join Date</th>
                    <th>Department</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th><button onClick={e=> addEmployee()}>Add Employee</button></th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee._id}>
                        <td>{employee.first_name} {employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.position}</td>
                        <td>{employee.salary}</td>
                        <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                        <td>{employee.department}</td>
                        <td>{employee.created_at ? new Date(employee.created_at).toLocaleString() : ''}</td>
                        <td>{employee.updated_at ? new Date(employee.updated_at).toLocaleString() : ''}</td>
                        <td>
                            <button onClick={e => viewEmployee(employee._id)}>View</button>
                            <button onClick={e => updateEmployee(employee._id)}>Update</button>
                            <button onClick={e=> deleteEmployee(employee._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

