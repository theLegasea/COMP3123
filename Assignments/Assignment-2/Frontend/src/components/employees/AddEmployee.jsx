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

    return (
        <div>
            <h2>Add new Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="first_name" value={employee.first_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Last Name: </label>
                    <input type="text" name="last_name" value={employee.last_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={employee.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Position: </label>
                    <input type="text" name="position" value={employee.position} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Salary: </label>
                    <input type="number" name="salary" value={employee.salary} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Date of Joining: </label>
                    <input type="date" name="date_of_joining" value={employee.date_of_joining}
                           onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Department: </label>
                    <input type="text" name="department" value={employee.department} onChange={handleInputChange}/>
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}



