import { useEffect, useState } from 'react';
import Message from './Message';

export default function Messages({ socket }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('msg', messages => {
            setMessages(messages);
        });
    }, [socket]);

    return (
        <ul style={{paddingLeft:'20px', paddingRight:'20px'}}>
            {messages.map((message, i) => (
                <Message key={i} msg={message} />
            ))}
        </ul>
    );
}
