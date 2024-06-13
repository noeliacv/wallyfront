import React from "react";
import {Layout} from "antd";
import Navbar from "../Navbar";
import Fondo from "../Fondo";
import Title from "../Title";

const {Content} = Layout;

export const Home = () => {
  return (
    <>
    <Content>
      <Navbar />
      <Fondo />
      <Title subTitulo="Encuentra todo aqui" titulo="RESULTADOS DE TORNEOS" />
      
      </Content>
    </>
  );
};