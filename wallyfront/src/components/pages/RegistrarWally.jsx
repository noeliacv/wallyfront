import React from "react";
import Title from "../Title";
import Wally from "../Wally";
export const RegistrarWally = ({user_ID}) => {
  return (
    <>
    <div className="fondos spa">
    <Title subTitulo="Tu lugar para el Wally" titulo="Registrate Ahora" />
    <Wally user_ID={user_ID}/>
    </div>
    </>
  );
};