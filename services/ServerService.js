import axios from "axios";

export const ServerService = {

    testConnection: async (baseUrl, port) => {
        try{
            const response = await axios.get(`http://${baseUrl}:${port}/`);
            if (response.status === 200)
            {
                return true;
            } else {
                return false;
            }
        } catch(error) {
            throw new Error('Connection Failed');
        }
    }
};
