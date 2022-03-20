import { useContext } from "react";
import Context from "./../Context";
import style from "../Messages/Message.module.css";

export default function Message({ msg }) {
    const { user } = useContext(Context);

    const isCurrentUser = user.id === msg.user.id;

    return (
        <li
            className={style.convoSection}
            style={{ justifyContent: isCurrentUser ? "" : "right" }}
        >
            <div 
                className={style.convo}
                style={{background: isCurrentUser ? "whitesmoke" : "#DB1E3D",
                }}
            >
                {!isCurrentUser ? (
                    <span className={style.name}>{msg.user.name}</span>
                ) : null}
                <span className={style.message}>{msg.message}</span>
            </div>
        </li>
    );
}
