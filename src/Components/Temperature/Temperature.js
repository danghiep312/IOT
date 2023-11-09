import React, {useEffect, useState} from 'react';
import './Temperature.css';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

function Temperature({temp}) {
    const [temperature, setTemperature] = useState(0); // Giả định nhiệt độ
    let temperatureClass = 'normal';

    // Xác định biểu tượng thời tiết dựa trên nhiệt độ
    // if (randomNum != null && randomNum > 0) {
    //     setTemperature(randomNum)
    // }
    let weatherIcon;
    if (temperature < 10) {
        weatherIcon = <WiSnow />;
        temperatureClass = 'cold';
    } else if (temperature > 30) {
        weatherIcon = <WiDaySunny />;
        temperatureClass = 'hot';
    } else if (temperature >= 20 && temperature <= 30) {
        weatherIcon = <WiCloudy />;
        temperatureClass = 'normal';
    } else {
        weatherIcon = <WiRain />;
        temperatureClass = 'rainy';
    }

    useEffect(() => {

        if (temp != null && temp > 0) {
            setTemperature(temp);
        }


    }, [temp]);

    return (
        <div className={`nhietdo weather-box ${temperatureClass}`}>
            <p className='weatherIcon' >{weatherIcon} </p>
            <div className='thongtinnhietdo'> {temperature}°C</div>
        </div>
    );
}

export default Temperature;
