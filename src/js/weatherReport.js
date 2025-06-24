async function getData() {
    const url = 'https://api.weather.gov/points/41.655300,-83.535721';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Points response status: ${response.status}`);
        }

        const data = await response.json();
        const forecastUrl = data.properties.forecast; // or forecastHourly

        // Now fetch the actual forecast
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast response status: ${forecastResponse.status}`
            );
        }

        const forecastData = await forecastResponse.json();
        const periods = forecastData.properties.periods;

        // Example: Log the next few forecast periods
        periods.slice(0, 3).forEach((period) => {
            console.log(`${period.name}: ${period.detailedForecast}`);
            let weatherRow = document.getElementById('weather-row');

            let weatherCol = document.createElement('div');
            weatherCol.className = 'col-12 col-sm-6 col-md-4';
            weatherCol.innerHTML = `<p>${period.name}: ${period.detailedForecast}</p>`;
            weatherRow.appendChild(weatherCol);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }

}

getData();