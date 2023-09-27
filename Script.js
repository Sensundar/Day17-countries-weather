// Function to create a Bootstrap card for a country
function createCountryCard(country) {
    const cardColumn = document.createElement('div');
    cardColumn.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.textContent = country.name.common;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital}`;

    const region = document.createElement('p');
    region.textContent = `Region: ${country.region}`;

    const countrycode = document.createElement('p');
    countrycode.textContent = `Country code: ${country.flag}`;

    const flagImg = document.createElement('img');
    flagImg.className = 'card-img-top';
    flagImg.src = country.flags.png;
    flagImg.alt = `Flag of ${country.name.common}`;

    const weatherButton = document.createElement('button');
    weatherButton.className = 'btn btn-primary';
    weatherButton.textContent = 'Get Weather';

    
    weatherButton.addEventListener('click', () => {
        fetchWeatherData(country.capital);
        alert(`Capital`,$(country.capital));
        //fetchWeatherData();
    });

    cardBody.appendChild(flagImg);
    cardBody.appendChild(capital);
    cardBody.appendChild(region);
    cardBody.appendChild(countrycode);
    cardBody.appendChild(weatherButton);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardColumn.appendChild(card);

    return cardColumn;
}

// Function to fetch weather data for a given city (capital)
function fetchWeatherData(city) {
    // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
    const apiKey = `0f51d8c8f139465d274b36ffb1b01631`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

   fetch(apiUrl)
    .then(response => response.json())
        .then(weatherData => {
            //alert('Data');
            //console.log(`Current Weather in ${city}: ${weatherData.weather.description}`);
            alert(`Current Weather in ${city}: ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp}°C`);
        })
        .catch(error => {
            alert('Error');
            //console.error('Error fetching weather data:', error);

        });
}

// Function to fetch country data from REST Countries API
function fetchCountryData() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countryData => {
            let neededCountries = ['Italy', 'Norway', 'Kuwait', 'India'];
            const cardRow = document.getElementById('cardRow');
            countryData.forEach(country => {
                if (neededCountries.includes(country.name.common)){
                const card = createCountryCard(country);
                
                cardRow.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}

// Call the function to fetch country data
fetchCountryData();