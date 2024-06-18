import React from "react";
import Title from "../Title";
import Torneo from "../Torneo";
export const RegistrarTorneo = ({user_ID}) => {
  return (
    <>
    <div className="fondos spa">
    <Title subTitulo="Tu lugar para el Wally" titulo="Registrate Ahora" />
    <Torneo user_ID={user_ID}/>
    </div>
    </>
  );
};