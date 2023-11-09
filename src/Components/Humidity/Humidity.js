import React, {useEffect, useState} from 'react';
import './Humidity.css';
import { WiHumidity } from 'react-icons/wi';

function Humidity({hum}) {
    const [humidity, setHumidity] = useState(0); // Giả định nhiệt độ
    let humidityClass ;

    // Xác định biểu tượng thời tiết dựa trên nhiệt độ
    let weatherIcon;
    if (humidity < 50) {
        weatherIcon = <WiHumidity />;
        humidityClass = 'thap';
    } else if (humidity < 70) {
        weatherIcon = <WiHumidity />;
        humidityClass = 'trungbinh';
    } else {
        weatherIcon = <WiHumidity />;
        humidityClass = 'cao';
    }

    useEffect(() => {

        if (hum != null && hum > 0) {
            setHumidity(hum);
        }
    }, [hum]);

    return (
        <div className={`doam weather-box ${humidityClass}`}>
            <p className='weatherIcon' >{weatherIcon} </p>
            <div className='thongtindoam'> {humidity} %</div>
        </div>
    );
}

export default Humidity;