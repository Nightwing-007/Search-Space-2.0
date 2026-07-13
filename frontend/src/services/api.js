import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/algorithms';

export const runAlgorithm = async (algorithm, array, target = null) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${algorithm}`, {
            array,
            target
        });
        return response.data;
    } catch (error) {
        console.error("Error running algorithm:", error);
        throw error;
    }
};
