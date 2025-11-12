import axiosInstance from '../AxiosInstance';

const UserAPI = {
    signUp: async (data) => {
        try{
            const response = await axiosInstance.post('/user/signup', data);
            if (response.status === 201) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error signing up: ' + error.message);
        }
    },
    logIn: async (data) => {
        try {
            const response = await axiosInstance.post('/user/login', data);
            if (response.status === 200) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error logging in: ' + error.message);
        }
    }
}
export default UserAPI;