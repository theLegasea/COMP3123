// javascript
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeAPI from '../../api/employees/EmployeeAPI';

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
    const { id, employeeId } = useParams();
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
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: name === 'salary' ? (value === '' ? '' : Number(value)) : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!empId) return;
        // send update request
        EmployeeAPI.updateEmployee(empId, employee)
            .then((response) => {
                console.log('Employee updated successfully:', response.data ?? response);
                navigate('/');
            })
            .catch((error) => {
                console.error('There was an error updating the employee!', error);
            });
    }

    if (loading) return <div>Loading employee...</div>

    return (
        <div>
            <h2>Update Employee</h2>
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
                    <input type="date" name="date_of_joining" value={employee.date_of_joining} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Department: </label>
                    <input type="text" name="department" value={employee.department} onChange={handleInputChange}/>
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    )
}
