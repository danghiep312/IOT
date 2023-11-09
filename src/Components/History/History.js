import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function History() {
    const [actionData, setActionData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/action')
            .then((response) => response.json())
            .then((data) => {
                setActionData(data);
                console.log(data)
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Device</th>
                    <th>Status</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {actionData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.device}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.time).toLocaleTimeString().slice(0, 19).replace('T', ' ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default History;