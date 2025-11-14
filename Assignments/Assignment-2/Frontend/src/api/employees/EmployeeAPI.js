import axiosInstance from '../AxiosInstance';

const EmployeeAPI = {
    createEmployee: async (employeeData) => {
        try {
            const res = await axiosInstance.post('/emp/employees', employeeData);
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    getEmployees: async () => {
        try {
            const res = await axiosInstance.get('/emp/employees');
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    getEmployeeById: async (employeeId) => {
        try {
            const res = await axiosInstance.get(`/emp/employees/${employeeId}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    updateEmployee: async (employeeId, employeeData) => {
        try {
            const res = await axiosInstance.put(`/emp/employees/${employeeId}`, employeeData);
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    deleteEmployee: async (employeeId) => {
        try {
            const res = await axiosInstance.delete('/emp/employees', { params: { eid: employeeId } });
            return res.data;
        } catch (err) {
            throw err;
        }
    },

    employeeSearch: async (searchTerm) => {
        try {
            const st = (searchTerm || '').trim();
            if (!st) {
                const res = await axiosInstance.get('/emp/employees');
                return res.data;
            }
            const res = await axiosInstance.get(`/emp/employees/search/${encodeURIComponent(st)}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
};

export default EmployeeAPI;
