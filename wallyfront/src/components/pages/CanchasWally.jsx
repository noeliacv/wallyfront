import React from "react";
import Title from "../Title";
import Torneo from "../Torneo";
import InfoCanchas from "../InfoCanchas";
export const CanchasWally = ({user_ID}) => {
  return (
    <>
    <div className="fondos spa">
    <Title subTitulo="Tu lugar para el Wally" titulo="Wally" />
    <InfoCanchas />
    </div>
    </>
  );
};