import './App.css'
import {Route, Routes}from "react-router-dom";
import {Home} from "./components/pages";
import Fotter from "./components/Fotter"
function App() {


  return (
    
      <div className="App">
        <div className="content">
          <Routes>
            <Route path='/' element= {<Home/>}/>
          </Routes>
          <Fotter/>
        </div>
      </div>
    
  )
}

export default App
