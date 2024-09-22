document.getElementById('submitBtn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorDiv = document.getElementById('error');
    const multiSelect = document.getElementById('multiSelect');
    const responseDiv = document.getElementById('response');

    // Clear previous error and response
    errorDiv.textContent = '';
    responseDiv.textContent = '';

    // Validate JSON input
    try {
        const jsonData = JSON.parse(jsonInput);

        // Assuming your API endpoint is "/api/submit"
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const apiResponse = await response.json();
        
        // Show multi-select dropdown
        multiSelect.classList.remove('hidden');

        // Add event listener to handle selection
        multiSelect.addEventListener('change', () => {
            const selectedOptions = Array.from(multiSelect.selectedOptions).map(option => option.value);
            renderResponse(apiResponse, selectedOptions);
        });

    } catch (error) {
        errorDiv.textContent = 'Invalid JSON input. Please correct it.';
    }
});

function renderResponse(apiResponse, selectedOptions) {
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    // Filter and display based on selected options
    const filteredData = selectedOptions.reduce((acc, option) => {
        if (option === 'alphabets') {
            acc.push(...apiResponse.alphabets);
        } else if (option === 'numbers') {
            acc.push(...apiResponse.numbers);
        } else if (option === 'highestLowercase') {
            acc.push(String.fromCharCode(Math.max(...apiResponse.alphabets.map(char => char.charCodeAt(0)))));
        }
        return acc;
    }, []);

    responseDiv.textContent = filteredData.join(', ');
}