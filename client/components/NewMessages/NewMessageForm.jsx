import { useContext, useState } from 'react';
import Context from './../Context';
import style from '../../components/NewMessages/NewMessage.module.css'
import Image from 'next/image';
import Comment from '../../image/comment.png'

export default function NewMessageForm({ socket }) {
    const { user } = useContext(Context);
    const [message, setMessage] = useState('');

    const sendMsg = e => {
        e.preventDefault();

        socket.emit('msg', { user, message });
        setMessage('');
    };

    return (
        <form onSubmit={sendMsg} className={style.form}>
                <textarea
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    className={style.textarea}
                />
            <button type="submit" className={style.btn}>
                <p>Say something </p>
                <span className={style.btnImg}>
                    <Image src={Comment} alt="comment"/>
                </span>    
            </button>
        </form>
    );
}