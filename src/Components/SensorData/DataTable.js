import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import moment from "moment";
import Filter from "../Filter";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {
        field: 'temperature',
        headerName: 'Temperature',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        minWidth: 70,
        align: "center",
        disableColumnMenu: 'true'
    },
    {
        field: 'humidity',
        headerName: 'Humidity',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        minWidth: 70,
        align: "center",
        disableColumnMenu: 'true'
    },
    {
        field: 'light',
        headerName: 'Light',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        minWidth: 70,
        align: "center",
        disableColumnMenu: 'true'
    },
    // {
    //     field: 'dust',
    //     headerName: 'Dust',
    //     headerAlign: 'center',
    //     type: 'number',
    //     flex: 1,
    //     minWidth: 70,
    //     align: "center",
    //     disableColumnMenu: 'true'
    // },
    {
        field: 'time',
        headerName: 'Time',
        headerAlign: 'center',
        type: 'string',
        flex: 1,
        minWidth: 100,
        align: "center",
        disableColumnMenu: 'true'
    },
];

const upd_obj = (data) => {
    return data.map(obj => {
        obj.time = moment(obj.time).format("MM/DD/YYYY HH:mm:ss")
        return obj;
    });
}

export default function DataTable() {
    const [dats, setData] = useState([])
    const [rows, setRows] = useState([])
    const [searchText, setSearchText] = useState({
        idMin: '',
        idMax: '',
        temperatureMin: '',
        temperatureMax: '',
        humidityMin: '',
        humidityMax: '',
        lightMin: '',
        lightMax: '',
        dustMin: '',
        dustMax: '',
        timeMin: '',
        timeMax: '',
    });

    useEffect(() => {
        fetch('http://localhost:8080/sensordata')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                upd_obj(data);
                // console.log(data);
                setData(data);
                setRows(data);
                // setRows(createRowsData(data))
            })
            .catch((error) => console.log(error));
    }, []);


    useEffect(() => {
        const filteredRow = dats.filter((row) => {
            const id = row.id.toString();
            const temperature = row.temperature.toString();
            const humidity = row.humidity.toString();
            const light = row.light.toString();
            const dust = row.dust.toString();
            const time = row.time.toString();
            const {
                idMax,
                idMin,
                temperatureMin,
                temperatureMax,
                humidityMin,
                humidityMax,
                lightMin,
                lightMax,
                dustMin,
                dustMax,
                timeMin,
                timeMax,
            } = searchText;

            //console.log(searchText);
            return (
                checkNumberValue(idMin, idMax, id)
                && checkNumberValue(temperatureMin, temperatureMax, temperature)
                && checkNumberValue(humidityMin, humidityMax, humidity)
                && checkNumberValue(lightMin, lightMax, light)
                && checkNumberValue(dustMin, dustMax, dust)
                && checkTimeVal(timeMin, timeMax, time)
            );
        });
        setRows(filteredRow);
    }, [searchText]);

    const checkNumberValue = (minVal, maxVal, val) => {
        let tmpMin = -1;
        let tmpMax = 100000;
        let value = parseFloat(val);
        if (minVal !== '') tmpMin = parseFloat(minVal);
        if (maxVal !== '') tmpMax = parseFloat(maxVal);
        return value <= tmpMax && value >= tmpMin;
    }

    const checkTimeVal = (minTime, maxTime, time) => {
        if (minTime === '' && maxTime === '') return true;
        if (minTime !== '') minTime = moment(minTime).format("MM/DD/YYYY HH:mm:ss")
        if (maxTime !== '') maxTime = moment(maxTime).format("MM/DD/YYYY HH:mm:ss")
        //console.log(minTime + " " + maxTime + " " + time)
        let tmpMin = moment(minTime !== '' ? minTime : "01/01/2000 00:00:00", "MM/DD/YYYY HH:mm:ss");
        let tmpMax = moment(maxTime !== '' ? maxTime : "01/01/3000 00:00:00", "MM/DD/YYYY HH:mm:ss");
        let curTime = moment(time, "MM/DD/YYYY HH:mm:ss");
        //console.log(tmpMin + " " + tmpMax + " " + curTime);
        return (curTime.isSameOrAfter(tmpMin) && curTime.isSameOrBefore(tmpMax));

    }


    return (
        <div>
            <h1 align={"center"} style={{marginTop: "40px"}}>Sensor Data</h1>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Filter
                    title="ID"
                    minValue={searchText.idMin}
                    onMinChange={(value) => setSearchText({...searchText, idMin: value})}
                    maxValue={searchText.idMax}
                    onMaxChange={(value) => setSearchText({...searchText, idMax: value})}
                    inputType="number"
                />
                <Filter
                    title="Temperature"
                    minValue={searchText.temperatureMin}
                    onMinChange={(value) => setSearchText({...searchText, temperatureMin: value})}
                    maxValue={searchText.temperatureMax}
                    onMaxChange={(value) => setSearchText({...searchText, temperatureMax: value})}
                    inputType="number"
                />
                <Filter
                    title="Humidity"
                    minValue={searchText.humidityMin}
                    onMinChange={(value) => setSearchText({...searchText, humidityMin: value})}
                    maxValue={searchText.humidityMax}
                    onMaxChange={(value) => setSearchText({...searchText, humidityMax: value})}
                    inputType="number"
                />
                <Filter
                    title="Light"
                    minValue={searchText.lightMin}
                    onMinChange={(value) => setSearchText({...searchText, lightMin: value})}
                    maxValue={searchText.lightMax}
                    onMaxChange={(value) => setSearchText({...searchText, lightMax: value})}
                    inputType="number"
                />
                {/*<Filter*/}
                {/*    title="Dust"*/}
                {/*    minValue={searchText.dustMin}*/}
                {/*    onMinChange={(value) => setSearchText({...searchText, dustMin: value})}*/}
                {/*    maxValue={searchText.dustMax}*/}
                {/*    onMaxChange={(value) => setSearchText({...searchText, dustMax: value})}*/}
                {/*    inputType="number"*/}
                {/*/>*/}
                <Filter
                    title="Time"
                    minValue={searchText.timeMin}
                    onMinChange={(value) => setSearchText({...searchText, timeMin: value})}
                    maxValue={searchText.timeMax}
                    onMaxChange={(value) => setSearchText({...searchText, timeMax: value})}
                    inputType="datetime-local"
                />

                {/*<Filter*/}
                {/*    title="Time"*/}
                {/*    minValue={searchText.timeMin}*/}
                {/*    onMinChange={(value) => setSearchText({ ...searchText, timeMin: value })}*/}
                {/*    maxValue={searchText.timeMax}*/}
                {/*    onMaxChange={(value) => setSearchText({ ...searchText, timeMax: value })}*/}
                {/*/>*/}
            </div>
            <div style={{marginTop: 30, marginLeft: 20, marginRight: 20, width: '98%', overflow: "hidden"}}>
                {/*<SearchBar rows={rows} columns={columns} onSearch={handleSearch}/>*/}
                <DataGrid
                    disableRowSelectionOnClick="true"
                    hideFooterSelectedRowCount="true"
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10, 20, 50]}
                />
            </div>
        </div>
    );
}
