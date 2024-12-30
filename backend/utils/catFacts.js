const axios = require('axios');

exports.getRandomCatFact = async () => {
    try {
        const response = await axios.get('https://catfact.ninja/fact', { timeout: 10000 });
        return response.data.fact;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out');
            throw new Error('Cat fact API request timed out');
        } else {
            console.error('Error fetching cat fact:', error);
            throw new Error('Failed to fetch cat fact');
        }
    }
};