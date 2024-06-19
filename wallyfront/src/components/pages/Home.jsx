import React from "react";
import { Layout } from "antd";
import Fondo from "../Fondo";
import Title from "../Title";
import Evento from "../Evento";
import Informacion from "../Informacion";
const { Content } = Layout;

export const Home = ({ user, user_ID }) => {
  return (
    <>
      <Content>

        {user && (
          <>
            <Fondo titulo="Canchas listas, jugadores preparados ¡Que comience el juego!" subtitulo="WallyNet es como el director de orquesta que armoniza cada nota de la experiencia deportiva, desde la inscripcion hasta el ultimo punto en la cancha, 
  creando una sinfonia digital que eleva el juego y la comunidad a nuevas alturas" user={user}/>
            <Title subTitulo="Encuentra todo aqui" titulo="RESULTADOS DE TORNEOS" />
            <Evento />
            <div className="bar">
              <Informacion />
            </div>
          </>

        )}
        {!user && (
          <>
            <Fondo titulo="Canchas que llaman, torneos que emocionan: ¡Tu victoria empieza aquí!" subtitulo="WallyNet es como el director de orquesta que armoniza cada nota de la experiencia deportiva, desde la inscripcion hasta el ultimo punto en la cancha, 
  creando una sinfonia digital que eleva el juego y la comunidad a nuevas alturas" />
            <Title subTitulo="Encuentra todo aqui" titulo="RESULTADOS DE TORNEOS" />
            <Evento />
          </>

        )}
        <div className="bar">

        </div>
      </Content>
    </>
  );
};