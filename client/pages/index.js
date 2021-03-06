import Head from 'next/head'
import Image from 'next/image'
import { io } from 'socket.io-client'
import { useContext, useEffect, useState } from 'react'
import Context from '../components/Context'
import EnterChatForm from '../components/Entry/EnterChatForm'
import Users from '../components/Users/Users'
import NewMessageForm from '../components/NewMessages/NewMessageForm'
import Messages from '../components/Messages/Messages';
import styles from '../styles/Home.module.css'

export default function Home() {
  const { user, setUser } = useContext(Context);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);
    setUser(null);
    return () => { newSocket.close() };
  }, [setSocket]);

  return (
    <div>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/trueno" type="text/css" />
      </Head>

      <div className={styles.entry}>
        {user && socket && socket.connected ? (
          <div>
            <div>
              {/* <Users socket={socket}/> */}
            </div>
            <div>
              <h1 className={styles.header}>Troff Chat</h1>
              <hr className={styles.hr}/>
              <div   className={styles.msgs}>
                <Messages socket={socket} />
              </div>
              <div className={styles.msgSection}>
                <NewMessageForm socket={socket} />
              </div>
            </div>
          </div>
        ) : null}
        {!user && socket ? (
          <div className={styles.form}>
            <EnterChatForm socket={socket} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
