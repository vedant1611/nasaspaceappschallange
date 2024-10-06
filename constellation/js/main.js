const APPLICATION_ID = 'f8e516b4-1449-4946-873a-6917e8a70bb4'; // Replace with your Application ID
const APPLICATION_SECRET = 'b6bd2a57a3efeef9764ca7d08585571f30de64468e2204b5b6f3fe66e78291afbec43b93038507b4d37686bbc9b08812129ab40860bc6b3992246c93734974f387949df4a4d9782d592a0748abb50cb2f317fc0a4e464a8ae9867d3c4126a12610cb4b1b6ab58a678c48354e43ab4cad'; // Replace with your Application Secret
const chartContainer = document.getElementById('chart');

async function getStarChart() {
    const authString = btoa(`${APPLICATION_ID}:${APPLICATION_SECRET}`); // Create the Basic Auth string

    try {
        const response = await fetch(`https://api.astronomyapi.com/api/v2/studio/star-chart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}` // Use Basic Authentication
            },
            body: JSON.stringify({
                "location": {
                    "latitude": 34.0522, // Change to your latitude
                    "longitude": -118.2437, // Change to your longitude
                    "timezone": "America/Los_Angeles" // Change to your timezone
                },
                "date": new Date().toISOString(),
                "view": {
                    "type": "3d",
                    "orientation": "N"
                }
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        renderStarChart(data.data); // Pass the received data to the render function
    } catch (error) {
        console.error('Error fetching star chart:', error);
    }
}

function renderStarChart(data) {
    // Clear the chart container
    chartContainer.innerHTML = '';

    // Assuming data has a property that provides a base64 image string
    const img = document.createElement('img');
    img.src = `data:image/png;base64,${data.image}`;
    img.alt = 'Star Chart';
    img.style.width = '100%';
    img.style.height = '100%';

    chartContainer.appendChild(img);
}

document.getElementById('generateChart').addEventListener('click', getStarChart);
