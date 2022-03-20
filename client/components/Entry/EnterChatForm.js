import { useContext, useEffect, useState } from "react";
import style from './EnterChatForm.module.css'
import Context from "../Context";


export default function EnterChatForm({ socket }) {

    const { setUser } = useContext(Context);
    const [localUser, setLocalUser] = useState('');

    useEffect(() => {
        socket.on('user', user => {
            setUser(user);
        });
    }, [socket]);

    const handleEnterChat = e => {
        e.preventDefault();
        socket.emit('user', localUser);
        setLocalUser('');
    }


    return (

        <form onSubmit={handleEnterChat} className={style.form}>
            <input
                type="text"
                placeholder="Insert your name here..."
                value={localUser}
                onChange={e => setLocalUser(e.target.value)}
                className={style.formInput}
            />
            <button
                type="submit"
                className={style.btn}
            >
                Enter
            </button>
        </form>
    )
}