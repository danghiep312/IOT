import React, {useEffect, useState} from 'react';
import './Dust.css';
import {WiDust} from "react-icons/wi";

function Dust({payload, dus, publish}) {

    const [dust, setDust] = useState(0); // Giả định nhiệt độ
    // Giả định nhiệt độ
    let dustClass = 'normal';
    let weatherIcon = <WiDust  />
    if (dust < 20) {
        dustClass = 'buiit';
    } else if (dust < 40) {
        dustClass = 'hoibui';
    } else if (dust < 65) {
        dustClass = 'bui';
    } else {
        dustClass = 'ratbui';
    }

    useEffect(() => {
        if (dus != null && dus > 0) {
            setDust(dus);
        }
        //console.log("pub dust" + dust.toString())
        publish("messages/dust", dust.toString());

    }, [dus, dust]);

    return (
        <div className={`bui1 weather-box ${dustClass}`}>
            <div className='weatherIcon' > {weatherIcon} </div>
            <div className='thongtinbui'> {dust}</div>
        </div>
    );
}

export default Dust;
