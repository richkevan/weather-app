import React, { useEffect } from 'react'
import axios from 'axios'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import './component.css'
import WeatherDisplay from './weatherdisplay'
import Location from './location'
const baseURL = 'https://api.weatherapi.com/v1/'



const WeatherForm = () => {
    const [location, setLocation] = React.useState('')
    const [aqi, setAqi] = React.useState('no')
    const [weather, setWeather] = React.useState(null)
    const [cityPosition, setCityPosition] = React.useState({lat:null, lng:null})
    const [localPosition, setLocalPosition] = React.useState({lat:null, lng:null})
    
    useEffect(() => {
        navigator.geolocation.watchPosition(position => {
            console.log(position)
            setLocalPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            }, 
            err => console.log(err),
            {enableHighAccuracy: true, timeout: 2500, maximumAge: 1000}
        )
    } , [])
    
    const searchOptions = {
        types: ['(cities)'],
        componentRestrictions: {country: 'us'}
    }
    const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
        <div className="autocomplete-root">
          <input className="form-control" {...getInputProps()} />
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => (
              <div {...getSuggestionItemProps(suggestion)} className="suggestion" key={suggestion.placeId}>
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      );

    const onSubmit = (e) => {
        if (e.target.name === 'location') {
            setLocation(e.target.value)
        }
        if (e.target.name === 'aqi') {
            if (e.target.checked) {
                setAqi('yes')
            }
        }
    }

    const handleChange = (address) => {
        setLocation(address)
    }

    const handleSelect = (address) => {
        setLocation(address)
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(({lat, lng}) => {
            setCityPosition({lat:lat, lng:lng})
        })
    }

    const getWeather = async() => {
        //  const url = `${baseURL}current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${lat},${lng}&${aqi}`
            const url = `${baseURL}current.json?key=51b3275436944c838e6211230213012&q=${cityPosition.lat},${cityPosition.lng}&aqi=${aqi}`
            console.log('requesting')
            const response = await axios.get(url)
            .then(response => {
                setWeather(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form>
                <label htmlFor='location'>
                    Location<br />
                    <span className='subLabel'>
                        Enter a city
                    </span>
                    <PlacesAutocomplete
                    value={location}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    onSubmit={onSubmit}
                    searchOptions={searchOptions}
                    >
                        {renderInput}
                    </PlacesAutocomplete>
                </label>
                <label htmlFor='aqi'>
                    Include AQI
                    <input type='checkbox' name='aqi' onChange={onSubmit} onSubmit={onSubmit}></input>
                </label>
                <div className='buttonContainer'>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setCityPosition({lat: localPosition.lat, lng: localPosition.lng})}}>Locate me</button>
                    <input type='submit' value='Get Weather' onClick={(e) => {
                        e.preventDefault()
                        getWeather()
                        }}></input>
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