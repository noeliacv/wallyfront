import './App.css'
import {Route, Routes}from "react-router-dom";
import {Home, Registro,Busqueda, RegistrarWally, RegistrarTorneo} from "./components/pages";
import Fotter from "./components/Fotter"
function App() {


  return (
    
      <div className="App">
        <div className="content">
          <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/Registro' element= {<Registro/>}/>
            <Route path='/Busqueda' element= {<Busqueda/>}/>
            <Route path='/RegistrarWally' element= {<RegistrarWally/>}/>
            <Route path='/RegistrarTorneo' element= {<RegistrarTorneo/>}/>
          </Routes>
          <Fotter/>
        </div>
      </div>
    
  )
}

export default App
