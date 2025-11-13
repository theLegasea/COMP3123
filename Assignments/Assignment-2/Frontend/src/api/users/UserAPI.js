import axiosInstance from '../AxiosInstance';

const UserAPI = {
    signUp: (user) => {
        return axiosInstance.post('/user/signup', user);
    },
    logIn: (credentials) => {
        return axiosInstance.post('/user/login', credentials);
    }
};
export default UserAPI;