import React from 'react';
import "./Informacion.css"
import { Link, NavLink, useLocation } from "react-router-dom";
import Title from "./Title"
const Informacion = () => {
    return (
        <div className="principal">
            <button type="button" className="medio">
                <NavLink to="/Canchas">
                    <Title subTitulo="Encuentra todo aqui" titulo="Canchas de Wally" />
                </NavLink>
            </button>
            <button className="medio">
                <NavLink to="/Torneos">
                    <Title subTitulo="Encuentra todo aqui" titulo="Torneos de Wally" />
                </NavLink>
            </button>
        </div>

    );

}

export default Informacion