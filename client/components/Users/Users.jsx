import { useEffect, useState } from 'react';
import User from '../User/User';

export default function Users({ socket }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users);
        });
    }, [socket]);

    return (
        <ul style={{background: 'red'}}>
            {users.map((user, i) => (
                    <User user={user}  key={i}/>
            ))}
        </ul>
    );
}