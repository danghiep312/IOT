import React, {useEffect, useState} from 'react';
import './Light.css';
import {  WiLunarEclipse } from 'react-icons/wi';

function Light({light}) {

    const [lux, setLux] = useState(500); // Giả định nhiệt độ
     // Giả định nhiệt độ
    let luxClass = 'normal';

    // Xác định biểu tượng thời tiết dựa trên nhiệt độ
    let weatherIcon;
    if (lux < 100) {
        weatherIcon = <WiLunarEclipse  />;
        luxClass = 'toi';
    } else if (lux < 200) {
        weatherIcon = <WiLunarEclipse  />;
        luxClass = 'hoitoi';
    } else if (lux < 300) {
        weatherIcon = <WiLunarEclipse  />;
        luxClass = 'sang';
    } else {
        weatherIcon = <WiLunarEclipse  />;
        luxClass = 'ratsang';
    }

    useEffect(() => {


        if (light != null && light > 0) {
            setLux(light);
        }

    }, [light]);

    return (
        <div className={`anhsang1 weather-box ${luxClass}`}>
            <p className='weatherIcon' >{weatherIcon} </p>
            <div className='thongtinanhsang'> {lux}Lux</div>
        </div>
    );
}

export default Light;
