const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.bfhl = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        const { data, file_b64 } = req.body;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid data format" });
        }

        // Extract numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        // Find highest lowercase alphabet
        const lowestLowercase = alphabets
            .filter(char => char === char.toLowerCase())
            .sort().pop() || '';

        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: lowestLowercase ? [lowestLowercase] : [],
            file_valid: !!file_b64,
            file_mime_type: "image/png", // Example, determine from file_b64 if necessary
            file_size_kb: 400 // Example, calculate based on the base64 string
        };

        return res.json(response);
    } else if (req.method === 'GET') {
        return res.status(200).json({ operation_code: 1 });
    } else {
        return res.status(405).send('Method Not Allowed');
    }
});
