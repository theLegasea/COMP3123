import axiosInstance from 'Fontend/api/AxiosInstance';

const EmployeeAPI = {
    createEmployee: async (employeeData) => {
        try {
            const response = await axiosInstance.post('/employees', employeeData);
            if (response.status === 201) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error creating employee: ' + error.message);
        }
    },
    getEmployees: async () => {
        try{
            const response = await axiosInstance.get('/employees');
            if(response.data.status) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error fetching employees: ' + error.message);
        }
    },
    getEmployeeById: async (employeeId) => {
        try {
            const response = await axiosInstance.get(`/employees/${employeeId}`);
            if (response.data.status) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error fetching employee: ' + error.message);
        }
    },
    updateEmployee: async (employeeId, employeeData) => {
        try {
            const response = await axiosInstance.put(`/employees/${employeeId}`, employeeData);
            if (response.data.status) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error updating employee: ' + error.message);
        }
    },
    deleteEmployee: async (employeeId) => {
        try {
            const response = await axiosInstance.delete(`/employees`, { params: { eid: employeeId } });
            if (response.data.status) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error deleting employee: ' + error.message);
        }
    },
    employeeSearch: async (searchTerm) => {
        try {
            const response = await axiosInstance.get(`/employees/search`, { params: { q: searchTerm } });
            if (response.data.status) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error searching employees: ' + error.message);
        }
    },
}