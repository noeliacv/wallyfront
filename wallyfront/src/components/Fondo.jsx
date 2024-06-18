import React from 'react'
import './Fondo.css'
import flecha from '../images/dark-arrow.png'
import { Link, NavLink } from "react-router-dom";
const Fondo = () => {
  return (
    <div className='fondo'>
        <div className="texto-fondo">
            <h1> “Canchas que llaman, torneos que emocionan: ¡Tu victoria empieza aquí!” 
            </h1>
            <p>"WallyNet" es como el director de orquesta que armoniza cada nota de la experiencia deportiva, desde la inscripcion hasta el ultimo punto en la cancha, 
            creando una sinfonia digital que eleva el juego y la comunidad a nuevas alturas.
            </p>
            <button className='btn'><NavLink to = '/Registro'>Registrate ahora</NavLink><img src={flecha} alt="" /></button>
        </div>
    </div>
  )
}

export default Fondo