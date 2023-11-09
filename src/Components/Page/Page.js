import Charts from "../Chart/Charts";
import {useEffect, useState} from "react";
import "./Page.css";

import Temperature from "../Temperature/Temperature";
import Humidity from "../Humidity/Humidity";
import Light from "../Light/Light";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ChartDust from "../Chart/ChartDust";
import Dust from "../Dust/Dust";

const urldenon = "https://i.imgur.com/imqSxdm.png";
const urldenoff = "https://i.imgur.com/OXXnlPH.png";
const urlquaton = "https://i.imgur.com/Wx2lXcJ.png";
const urlquatoff = "https://i.imgur.com/ynfVzo0.png";

const Page = ({publish, subscriber, payload}) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isFanOn, setIsFanOn] = useState(false);
  const [lmsg, setLedControlMsg] = useState("true")
  const [fmsg, setFanControlMsg] = useState("true")

  const [dataChart, setData] = useState({
    temperature: [31, 20, 12, 45, 22, 30, 27, 32, 1, 17, 7, 39, 37, 15, 16, 41, 5, 20, 29, 15, 33, 9, 45, 13, 28, 17, 11, 7, 2, 38],
    humidity: [80, 82, 63, 57, 86, 42, 78, 61, 74, 40, 50, 85, 77, 87, 89, 88, 54, 75, 70, 85, 54, 53, 64, 44, 54, 69, 71, 79, 41, 66],
    light: [411, 419, 422, 407, 441, 529, 527, 428, 488, 417, 480, 370, 466, 300, 502, 510, 456, 396, 367, 597, 369, 337, 543, 577, 361, 560, 566, 377, 487, 571],
    dust: [31, 20, 12, 45, 22, 30, 27, 32, 1, 41, 5, 20, 29, 15, 33, 9, 45, 13, 28, 17, 11, 17, 7, 39, 37, 15, 16, 7, 2, 38],
  });


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //
  //     const temp = getRandomInt(15, 45);
  //     const hum = getRandomInt(50, 100);
  //     const li = getRandomInt(50, 400);
  //     const dust = getRandomInt(1, 101);
  //
  //     const updatedData = { ...dataChart };
  //     updatedData.temperature.push(temp);
  //     updatedData.temperature.shift();
  //
  //     updatedData.humidity.push(hum)
  //     updatedData.humidity.shift()
  //
  //     updatedData.light.push(li)
  //     updatedData.light.shift()
  //
  //     updatedData.dust.push(dust)
  //     updatedData.dust.shift()
  //
  //     setData(updatedData)
  //   }, 2000);
  //
  //   return () => clearInterval(interval);
  // }, [dataChart]);

  useEffect(() => {
    if (payload.topic === 'messages/datasensor')
    {
        let o = JSON.parse(payload.message)
        updateDataChart(o.temperature, o.humidity, o.light)
    }
  }, [payload]);

  const updateDataChart = (temp, hum, light) => {
    const updatedData = { ...dataChart };
        updatedData.temperature.push(temp);
        updatedData.temperature.shift();

        updatedData.humidity.push(hum)
        updatedData.humidity.shift()

        updatedData.light.push(light)
        updatedData.light.shift()

        // updatedData.dust.push(dust)
        // updatedData.dust.shift()

        setData(updatedData)
  }

  const toggleLight = () => {
    setIsLightOn((prevState) => !prevState);
    if (isLightOn) setLedControlMsg("true");
    else setLedControlMsg("false");

    publish("messages/led", lmsg);
  };

  const toggleFan = () => {
    setIsFanOn((prevState) => !prevState);
    if (isFanOn) setFanControlMsg("true");
    else setFanControlMsg("false");

    publish("messages/fan", fmsg);

    // publish("messages/dust", fmsg)
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


  return (
      <div className="pagee" style={{height: "100vh"}}>
        <div className="menuu">

        </div>
        <div className="page-chucnang">
          {/*<Temperature payload={payload} />*/}
          {/*<Humidity payload={payload} />*/}
          {/*<Light/>*/}
          <Temperature temp={dataChart.temperature[dataChart.temperature.length - 1]}/>
          <Humidity hum={dataChart.humidity[dataChart.humidity.length - 1]}/>
          <Light light={dataChart.light[dataChart.light.length - 1]}/>
          <Dust dus={dataChart.dust[dataChart.light.length - 1]} publish={publish}/>
          {/*<Dust payload={payload}/>*/}
        </div>
        <div className="page-btn">
          <div className="page-bieudo">
            <Charts data={dataChart}/>
            <ChartDust data={dataChart}/>
          </div>
          <div className="page-btn-chucnang">
            <div className="page-btn-den">
              <div className="btn-icon">
                <img className="btn-icon-den" src={isLightOn ? urldenon : urldenoff} alt="Bulb" />
                <br/>
                <button className={`light-btn ${isLightOn ? 'on' : 'off'}`} onClick={toggleLight}>
                  <span className="light-icon"></span>
                </button>
              </div>
            </div>

            <div className="page-btn-quat">
              <div className="btn-icon">
                <img className="btn-icon-den" src={isFanOn ? urlquaton : urlquatoff} alt="Bulb" />
                <br/>
                <button className={`light-btn ${isFanOn ? 'on' : 'off'}`} onClick={toggleFan}>
                  <span className="light-icon"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default Page;
