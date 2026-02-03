// import axios from "axios";

// const API_URL = "http://localhost:8080/api/trainers/enrollment";

// export const getEnrollments = () => axios.get(API_URL);
// export const createEnrollment = (data) => axios.post(API_URL, data);
// export const updateEnrollment = (id, data) => axios.put(`${API_URL}/${id}`, data);
// export const deleteEnrollment = (id) => axios.delete(`${API_URL}/${id}`);

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/trainers/enrollment';

export const getAllEnrollments = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const enrollTrainer = async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};

export const updateEnrollment = async (id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
};

export const deleteEnrollment = async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};
