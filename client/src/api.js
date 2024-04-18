exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        try {
            const data = require('./db.json'); // Process the GET request as needed
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process GET request' }),
            };
        }
    }
};

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            const requestBody = JSON.parse(event.body); // Parse incoming JSON payload
            // Save data to a database or perform other necessary operations
            // ...
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'POST request processed successfully' }),
            };
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Failed to process POST request' }),
            };
        }
    }
};
