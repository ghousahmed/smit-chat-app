import { useEffect, useState } from 'react'
import AppRouter from './config/router'
import User from './context/user'
import store from './store'
import { Provider } from 'react-redux'
import { db, auth, doc, getDoc, onAuthStateChanged } from './config/firebase'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data())
        } else {
          console.log("No such document!");
        }
      }
    })
  }, [])
  return (
    <Provider store={store}>
      <User.Provider value={{ user }}>
        <AppRouter />
      </User.Provider>
    </Provider>
  )
}

export default App
