import React, {useEffect, useState} from 'react';
import {Card, List} from 'antd';
const topics = ['messages/sensordata', 'messages/device']
const Receiver = ({payload}) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {

        if (payload.topic) {
            setMessages(messages => [...messages, payload])
            //console.log("fetch now topic: " + payload.topic + " message: " + payload.message);

            if (payload.topic === topics[1]) {
                fetch('http://localhost:8080/addaction', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json; charset =ISO-8859-1",
                    },
                    body: payload.message,

                }).then().catch((err) => console.log(err));
            }
            else {
                fetch('http://localhost:8080/addsensordata', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json; charset =ISO-8859-1",
                    },
                    body: payload.message,
                }).then().catch((err) => console.log(err));
            }
        }
    }, [payload])

    const renderListItem = (item) => (
        <List.Item>
            <List.Item.Meta
                title={item.topic}
                description={item.message}
            />
        </List.Item>
    )

    return (
        <Card
            title="Receiver"
        >
            <List
                size="small"
                bordered
                dataSource={messages}
                renderItem={renderListItem}
            />
        </Card>
        // <div></div>
    );
}

export default Receiver;