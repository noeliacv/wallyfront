import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-conf';
import { collection, getDocs } from 'firebase/firestore';
import { Card } from 'antd';
import './InfoTorneo.css';

const InfoTorneos = () => {
    const [torneos, setTorneos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'torneo'));
                const torneoData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                console.log("Torneo data:", torneoData);
                setTorneos(torneoData);
            } catch (error) {
                console.error("Error fetching torneos: ", error);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <div className="torneo-list">
            {torneos.map((torneo, index) => (
                <Card key={index} className="torneo-card">
                    <img 
                        src={torneo.imageURL} 
                        alt={torneo.nombre} 
                        className="torneo-image" 
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/250";
                        }} 
                    />
                    <div className="torneo-info">
                        <h2>{torneo.nombre}</h2>
                        <h2>{torneo.nombreWally}</h2>
                        <p><strong>Dirección:</strong> {torneo.ubicacion}</p>
                        {torneo.horario && torneo.horario.length === 2 ? (
                            <p><strong>Horario:</strong> {torneo.horario[0]} - {torneo.horario[1]}</p>
                        ) : (
                            <p><strong>Horario:</strong> No disponible</p>
                        )}
                        {torneo.fecha && torneo.fecha.length === 2 ? (
                            <p><strong>Fechas:</strong> Inicio {torneo.fecha[0].toDate().toLocaleDateString()} - Fin {torneo.fecha[1].toDate().toLocaleDateString()}</p>

                        ) : (
                            <p><strong>Fechas:</strong> No disponible</p>
                        )}
                        <p><strong>Departamento:</strong> {torneo.departamento}</p>
                        <p><strong>Numero Max Jugadores:</strong> {torneo.jugadores}</p>
                        <p><strong>Teléfono:</strong> {torneo.telefono}</p>
                    </div>
                </Card>
                
            ))}
        </div>
    );
};

export default InfoTorneos;
