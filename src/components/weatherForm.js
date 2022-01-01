import React from 'react'
import axios from 'axios'
import './component.css'
import WeatherDisplay from './weatherdisplay'
import Location from './location'



const WeatherForm = () => {
    const [location, setLocation] = React.useState('')
    const [aqi, setAqi] = React.useState('no')
    const [weather, setWeather] = React.useState(null)

    const handleChange = (e) => {
        if (e.target.name === 'location') {
            setLocation(e.target.value)
        }
        if (e.target.name === 'aqi') {
            if (e.target.checked) {
                setAqi('yes')
            }
        }
        console.log(location, aqi)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.weatherkey}&q=${location}&aqi=${aqi}`
            const response = await axios.get(url)
            .then(response => setWeather(response.data))
            .catch(error => console.log(error))
            console.log(weather)
    }

    return (
        <div>
            <form>
                <label htmlFor='location'>
                    Location<br />
                    <span className='subLabel'>
                        Enter a city or zip code
                    </span>
                </label>
                <input type='text' name='location' onChange={handleChange}></input>
                <label htmlFor='aqi'>
                    Include AQI
                    <input type='checkbox' name='aqi' onChange={handleChange}></input>
                </label>
                
                <div className='buttonContainer'>
                    <button onClick={(e) => {
                        e.preventDefault()
                        console.log(weather)}}>Locate me</button>
                    <input type='submit' value='Submit' onClick={handleSubmit}></input>
                </div>
            </form>
            <div>
            {weather !== null &&
            <>
            <Location location={weather.location} />
            <WeatherDisplay weather={weather} />
            </>}
            </div>
        </div>
    )
}

export default WeatherForm
