import React from "react";
import './Evento.css';
import { Link, NavLink } from "react-router-dom";
import detalle_img from '../images/campeones.png'


const Evento = () => {
    return (
        <div className='detalle bar'>
            <div className='detalle_izq'>
                <img src={detalle_img} alt="" className='detalle-img' />
            </div>
            <div className="detalle_der">
                <h3 >Tabla de Posiciones</h3>
                <h2>Campeonato Ardillitas</h2>
                <div className="tabla-pos">
                    <div className="list-izq">
                        <ul>
                            <li><strong>Preimer Lugar</strong></li>
                            <li><strong>Segundo Lugar</strong></li>
                            <li><strong>Tercer Lugar</strong></li>
                            <li><strong>Cuarto Lugar</strong></li>
                        </ul>
                    </div>

                    <div className="list-der">
                        <ul>
                            <li>Ballenitas FC</li>
                            <li>Chancla Dura FC</li>
                            <li>Papayitas FC</li>
                            <li>Duraznitos FC</li>

                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Evento