import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataSensor.css'
import moment from "moment/moment";
import {GridColDef} from "@mui/x-data-grid";
import DataTable from "./DataTable";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90, disableColumnMenu: 'true'},
    {
        field: 'temperature',
        headerName: 'Temperature',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        minWidth: 80,
        align: "center",
        disableColumnMenu: 'true'
    },
    {
        field: 'humidity',
        headerName: 'Humidity',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        minWidth: 80,
        align: "center",
        disableColumnMenu: 'true'
    },
    {
        field: 'light',
        headerName: 'Light',
        headerAlign: 'center',
        type: 'number',
        flex: 1,
        minWidth: 80,
        align: "center",
        disableColumnMenu: 'true'
    },
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
        obj.time = moment(obj.time).format("DD/MM/YYYY HH:mm:ss")
        return obj;
    });
}

function DataSensor() {
    const [sensorData, setSensorData] = useState([])
    const [dataTableLoaded, setDataTableLoaded] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/sensordata')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                //upd_obj(data);
                setSensorData(data);
                console.log(data);
                setDataTableLoaded(true);
                //console.log(data)
            })
            .catch((error) => console.log(error));
    }, [sensorData]);

    return (
        <div>
            {dataTableLoaded && <DataTable rows={sensorData}/>}
        </div>
    );
}

export default DataSensor;