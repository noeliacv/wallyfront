import React from "react";
import NavbarUsuario from "../NavbarUsuario";
import Buscador from "../Buscador";
import Title from "../Title";
export const Busqueda = () => {
    return (
        <>
            <NavbarUsuario />
            <Title subTitulo="Tu lugar para el Wally" titulo="Registrate Ahora" />
            <div className="bar">
                <Buscador />
            </div>
        </>
    );
};