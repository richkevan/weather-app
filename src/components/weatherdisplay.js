import React from 'react'
import './component.css'

const WeatherDisplay = (props) => {
    const [aqi, setAqi] = React.useState('green')
    const [aqiDetail, setAqiDetail] = React.useState(false)
    const currentWeather = props.weather.current
    const aqiValue = currentWeather.air_quality

    return (
        <div className='weatherCards'>
            <div className='infoCard'>
                <h3>Conditions</h3>
                <p>Conditions: <strong>{currentWeather.condition.text}</strong></p>
                <img src={currentWeather.condition.icon} alt={currentWeather.condition.text} />
            </div>
            <div className='infoCard'>
                <h3>Temp</h3>
                <p>Current: <strong>{currentWeather.temp_f}&#8457;</strong></p>
                <p>Feels Like: <strong>{currentWeather['feelslike_f']}&#8457;</strong></p>
            </div>
            <div className='infoCard'>
                <h3>Wind</h3>
                <p>Wind Speed: <strong>{currentWeather.wind_mph} mph</strong></p>
                <p>Wind Direction: <strong>{currentWeather.wind_dir}</strong></p>
            </div>
            {currentWeather.air_quality !== undefined &&
                <div className='infoCard'>
                    <h3>Air Quality</h3>
                    <p>AQI: <strong>{currentWeather.air_quality['us-epa-index']}</strong></p>
                    <p style={{ backgroundColor: aqi, display: 'block'}}>&nbsp;</p>
                    <button onClick={() => {
                        setAqiDetail(!aqiDetail)
                        console.log(aqiDetail)
                        }}
                        style={{zIndex:1000}}>Details</button>
                    {aqiDetail && 
                    <>
                        <p>CO: <strong>{currentWeather.air_quality.co}</strong></p>
                        <p>O3: <strong>{currentWeather.air_quality.o3}</strong></p>
                        <p>NO2: <strong>{currentWeather.air_quality.no2}</strong></p>
                        <p>SO2: <strong>{currentWeather.air_quality.so2}</strong></p>
                        <p>PM2.5: <strong>{currentWeather.air_quality.pm2_5}</strong></p>
                        <p>PM10: <strong>{currentWeather.air_quality.pm10}</strong></p>
                    </>}
                </div>

            }
        </div>
    )
}

export default WeatherDisplay
