import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import moment from "moment";
import Filter from "../Filter";
import FilterOne from "../FilterOne";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90, disableColumnMenu: 'true'},
    {
        field: 'device',
        headerName: 'Device',
        headerAlign: 'center',
        type: 'string',
        flex: 1,
        minWidth: 100,
        align: "center",
        disableColumnMenu: 'true'
    },
    {
        field: 'status',
        headerName: 'Status',
        headerAlign: 'center',
        type: 'string',
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
        obj.time = moment(obj.time).format("MM/DD/YYYY HH:mm:ss")
        return obj;
    });
}

export default function Event() {
    const [dats, setData] = useState([])
    const [actionData, setActionData] = useState([])
    const [searchText, setSearchText] = useState({
        idMin: '',
        idMax: '',
        device: '',
        status: '',
        timeMin: '',
        timeMax: ''
    });


    useEffect(() => {
        fetch('http://localhost:8080/action')
            .then((response) => response.json())
            .then((data) => {
                upd_obj(data);
                setData(data)
                setActionData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const filteredRow = dats.filter((row) => {
            const id = row.id.toString();
            const dev = row.device.toString();
            const stats = row.status.toString();
            const time = row.time.toString();
            const {
                idMin,
                idMax,
                device,
                status,
                timeMin,
                timeMax,
            } = searchText;

            //console.log(searchText);
            return (
                checkNumberValue(idMin, idMax, id)
                && checkSubstring(dev, device)
                    && checkSubstring(stats, status)
                        && checkTimeVal(timeMin, timeMax, time)
            );
        });
        setActionData(filteredRow);
    }, [searchText]);

    const checkSubstring = (sample, val) => {
        //console.log(sample + " " + val +"1" + " " + sample.includes(val))
        return sample.includes(val);
    }

    const checkNumberValue = (minVal, maxVal, val) => {
        let tmpMin = -1;
        let tmpMax = 100000;
        let value = parseFloat(val);
        if (minVal !== '') tmpMin = parseFloat(minVal);
        if (maxVal !== '') tmpMax = parseFloat(maxVal);
        console.log("time " + (value <= tmpMax && value >= tmpMin))
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
            <h1 align={"center"} style={{marginTop: "40px"}}>Events</h1>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Filter
                    title="ID"
                    minValue={searchText.idMin}
                    onMinChange={(value) => setSearchText({...searchText, idMin: value})}
                    maxValue={searchText.idMax}
                    onMaxChange={(value) => setSearchText({...searchText, idMax: value})}
                    inputType="number"
                />

                <FilterOne
                    title="Device"
                    value={searchText.device}
                    onValueChange={(value) => setSearchText({...searchText, device: value})}
                    inputType="string"
                    // label="Device"
                />

                <FilterOne
                    title="Status"
                    value={searchText.status}
                    onValueChange={(value) => setSearchText({...searchText, status: value})}
                    inputType="string"
                    // label="Status"
                />

                <Filter
                    title="Time"
                    minValue={searchText.timeMin}
                    onMinChange={(value) => setSearchText({...searchText, timeMin: value})}
                    maxValue={searchText.timeMax}
                    onMaxChange={(value) => setSearchText({...searchText, timeMax: value})}
                    inputType="datetime-local"
                />
            </div>
            <div style={{marginTop: 30, marginLeft: 20, marginRight: 20, width: '98%', overflow: "hidden"}}>
                <DataGrid
                    disableRowSelectionOnClick="true"
                    hideFooterSelectedRowCount="true"
                    rows={actionData}
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
