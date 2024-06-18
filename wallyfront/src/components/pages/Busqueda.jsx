import React from "react";
import NavbarUsuario from "../NavbarUsuario";
import Buscador from "../Buscador";
import Title from "../Title";
export const Busqueda = () => {
    return (
        <>
            <div className="spa">
                <Title subTitulo="Tu lugar para el Wally" titulo="Registrate Ahora" />
            </div>
            <div className="bar">
                <Buscador />
            </div>
        </>
    );
};