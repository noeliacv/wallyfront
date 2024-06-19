import React from 'react'
import './Fondo.css'
import flecha from '../images/dark-arrow.png'
import { Link, NavLink } from "react-router-dom";
const Fondo = ({titulo, subtitulo,user}) => {
  return (
    <div className={` ${user ? 'fondoUser' : 'fondo'}`}>
        <div className="texto-fondo">
            <h1> {titulo}</h1>
            <p>{subtitulo}</p>
            {!user && (
          <>
          <button className='btn'><NavLink to = '/Registro'>Registrate ahora</NavLink><img src={flecha} alt="" /></button>
          </>)}
            
        </div>
    </div>
  )
}

export default Fondo