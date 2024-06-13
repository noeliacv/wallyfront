import React from "react";
import Registrar from "../Registrar";
import Title from "../Title";
import Navbar from "../Navbar";
export const Registro = () => {
  return (
    <>
    <Navbar/>
    <Title subTitulo="Tu lugar para el Wally" titulo="Registrate Ahora" />
    <Registrar />
    </>
  );
};