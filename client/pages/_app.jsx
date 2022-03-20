import '../styles/globals.css';
import Context from '../components/Context';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const store = { user, setUser}
  return (
    <Context.Provider value={store}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

export default MyApp
