import './App.css'
import {Route, Routes}from "react-router-dom";
import {Home, Registro,Busqueda, RegistrarWally, RegistrarTorneo, ListaTorneo, CanchasWally, BusquedaTorneo} from "./components/pages";
import Fotter from "./components/Fotter"
import ScrollToTop from './components/ScrollToTop.jsx'
import { auth, db } from "./firebase/firebase-conf";
import Navbar from "./components/Navbar";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarUsuario from './components/NavbarUsuario.jsx';


function App() {

  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);
      } else {
        setUser(null);
        setUserDetails(null);
        setLoading(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      console.log("Fetching data for UID:", uid);
      const docRef = doc(db, "clientes", uid);
      const docSnap = await getDoc(docRef);
      setUserID(uid);
      if (docSnap.exists()) {
        console.log("User data found:", docSnap.data());
        setUserDetails(docSnap.data());
      } else {
        console.log("No user data found for UID:", uid);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); 
    }
  };

  console.log("userDetails fuera de useEffect:", userID);

  return (
    
      <div className="App">
        <div className="content">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home user={user} userID={userID} />} />
            <Route path='/Registro' element= {<Registro/>}/>
            <Route path='/Busqueda' element= {<Busqueda/>}/>
            <Route path='/RegistrarWally' element= {<RegistrarWally user_ID={userID} />}/>
            <Route path='/RegistrarTorneo' element= {<RegistrarTorneo user_ID={userID}/>}/>
            <Route path='/Torneos' element= {<ListaTorneo user_ID={userID}/>}/>
            <Route path='/Canchas' element= {<CanchasWally user_ID={userID}/>}/>
            <Route path='/BusquedaTorneo' element= {<BusquedaTorneo/>}/>         
          </Routes>
        </div>
        <ToastContainer />
        {!loading && (
        user ? <NavbarUsuario userData={userDetails} userID={userID} /> : <Navbar />
      )}
        <Fotter/>
      </div>
    
  )
}

export default App
