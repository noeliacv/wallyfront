import React from "react";
import { Layout } from "antd";
import Fondo from "../Fondo";
import Title from "../Title";
import Evento from "../Evento";
import Informacion from "../Informacion";
const { Content } = Layout;

export const Home = () => {
  return (
    <>
      <Content>
        <Fondo />
        <Title subTitulo="Encuentra todo aqui" titulo="RESULTADOS DE TORNEOS" />
        <Evento />
        <Title subTitulo="Encuentra todo aqui" titulo="RESULTADOS DE TORNEOS" />
        <div className="bar">
          <Informacion />
        </div>
      </Content>
    </>
  );
};