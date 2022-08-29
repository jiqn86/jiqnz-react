import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { NewJiqnz } from './components/new-jiqnz/NewJiqnz';
import { Timeline } from './components/timeline/Timeline';
import { UserProfile } from './components/user-profile/UserProfile';
import { auth, Providers } from './config/firebase';
import { UserContext } from './context/UserContext'


function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  useEffect(()=> {
    checkUser()
  }, [])

  const checkUser = () => {
    auth.onAuthStateChanged((userFromAuth) => {
      if (userFromAuth) {
        setUser(auth.currentUser);
        setIsLoggedIn(true);
      }
    })
  }

  const handleLoginLogout = () => {
    if (user) {
      auth.signOut().then(() => {
        setIsLoggedIn(false)
        setUser(null);
      })
    } else {
      auth.signInWithPopup(Providers.google).then((res) => {
        if (res.user) {
          setIsLoggedIn(true);
          setUser(res.user);
        }
      })
    }
  }
  return (
    <UserContext.Provider value={{user, showModal: false}}>
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} handleClick={handleLoginLogout} />
      {
        isLoggedIn ?
          <div>
            <div className="container">
              <NewJiqnz />
            </div>
            <div className="row container p-3 text-center m-auto">
              <div className="col-lg-3 col-md-12">
                <UserProfile />
              </div>
              <div className="col-lg-9 col-md-12">
                <Timeline />
              </div>
            </div>
          </div> :
          <div className="row container p-3 text-center m-auto">
            <div className="col-lg-12 col-md-12">
              <Timeline />
            </div>
          </div>
      }
    </div>
    </UserContext.Provider>
  );
}

export default App;