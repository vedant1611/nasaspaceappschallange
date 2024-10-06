// Import necessary modules
import fetch from 'node-fetch'; // ES module syntax for node-fetch
import { appendFileSync } from 'fs';

// Your N2YO API key
const apiKey = 'QZNGF7-LP2RT6-NN3X4Z-5CIQ';

// NORAD IDs of popular satellites (e.g., ISS, Hubble Space Telescope, etc.)
const satelliteNoradIds = [
    25544, // ISS (International Space Station)
    20580, // Hubble Space Telescope
    33591, // Terra (Earth observation)
    28654, // GOES-13 (weather satellite)
];

// Base URL for the N2YO API
const n2yoBaseUrl = 'https://api.n2yo.com/rest/v1/satellite/positions/';

// Function to fetch satellite data
async function fetchSatelliteData(satelliteId, observerLat, observerLon, observerAlt) {
    const url = `${n2yoBaseUrl}${satelliteId}/${observerLat}/${observerLon}/${observerAlt}/1/&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.positions && data.positions.length > 0) {
            const position = data.positions[0];
            const satelliteInfo = {
                satelliteId: satelliteId,
                latitude: position.satlatitude,
                longitude: position.satlongitude,
                altitude: position.sataltitude
            };

            console.log(satelliteInfo);

            // Write the satellite info to a file (append mode)
            appendFileSync('satellite_data.txt', JSON.stringify(satelliteInfo) + '\n', 'utf8');
        } else {
            console.log(`No data available for satellite ID: ${satelliteId}`);
        }
    } catch (error) {
        console.error(`Error fetching data for satellite ID: ${satelliteId}`, error);
    }
}

// Observer's location (lat, lon, and altitude in km)
const observerLat = 37.7749; // Example: San Francisco
const observerLon = -122.4194;
const observerAlt = 0.2; // Altitude in km

// Fetch and print the location of each satellite
(async function() {
    for (const satelliteId of satelliteNoradIds) {
        await fetchSatelliteData(satelliteId, observerLat, observerLon, observerAlt);
    }
})();
