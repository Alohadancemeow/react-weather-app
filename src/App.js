import React, { useState } from 'react';
import keys from './Key'
import './App.css';

// # Use api : openweathermap.org
const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
}

function App() {

  // # Build Datetime
  const dataBuild = (d) => {
    let date = String(new window.Date())
    d = date.slice(3, 15)
    return d
  }


  // # States
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})


  // # Search ..
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((results) => {
          setQuery("")
          setWeather(results)
          console.log(results);
        })
    }
  }

  return (

    // # Defualt className = App
    // # if weather > 18 add className = hot
    // # if weather < 18 add className = cold
    <div className={
      typeof weather.main != "undefined"
        ? weather.main.temp > 18
          ? "App hot"
          : "App cold"
        : "App"
    }>
      <main>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search.."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (

          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dataBuild(new Date())}
              </div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
            </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>

        ) : (
          ""
        )}

      </main>

    </div>
  );
}

export default App;
