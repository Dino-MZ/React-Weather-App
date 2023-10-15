import React, {useState} from 'react';

function App() {

  const [city, setCity] = useState('');
	const [weatherInfo, setWeatherInfo] = useState(null);

  function getWeather() {
    const apiKey = 'cf499b319763fbad75324f6bdb5a378d';
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				let MT = Math.round(data.main.temp);
				let FL = Math.round(data.main.feels_like);

				const weather = {
					location: `Weather in ${data.name}`,
					temperature: ` ${MT} °F`,
					feelsLike: `Feels Like: ${FL} °F`,
					humidity: `Humidity: ${data.main.humidity} %`,
					wind: `Wind: ${data.wind.speed} mph`,
          condition: `Weather Condition: ${data.weather[0].description}`,
				};

				setWeatherInfo(weather);
			})

			.catch((error) => {
				console.error(error);
        alert("City Does Not Exist")
			});
  }

  return (
    <div className="app">
      <div className='weather-container'>
			  <input
			  	type='text'
			  	placeholder='Enter city name'
			  	value={city}
			  	onChange={(e) => setCity(e.target.value)}
			  />
			  <button onClick={getWeather}>Get Weather</button>

			  {weatherInfo && (
			  	<div className='weather-info'>

            <div class='top'>
			  		  <h1>{weatherInfo.location}</h1>
			  		  <h2>{weatherInfo.temperature}</h2>
			  	  	<p>{weatherInfo.condition}</p>
            </div>

            <div className='bottom'>
			  		<p>{weatherInfo.feelsLike}</p>
			  		<p>{weatherInfo.humidity}</p>
			  		<p>{weatherInfo.wind}</p>
            </div>

			  	</div>
			  )}
		  </div>
    </div>
  );
}

export default App;
