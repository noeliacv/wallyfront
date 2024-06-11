import React from "react";
import Navbar from "../Navbar";
import Fondo from "../Fondo";
import Title from "../Title";
export const Home = () => {
    return (
      <>
      <Navbar />
        <Fondo />
        <Title subTitulo="Encuentra todo aqui" titulo="RESULTADOS DE TORNEOS"/>
       </>
  );
};