import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-conf';
import { collection, getDocs } from 'firebase/firestore';
import { Card } from 'antd';
import './InfoCanchas.css';

const InfoCancha = () => {
    const [wallys, setWallys] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'wallys'));
                const wallyData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                console.log("Wally data:", wallyData);
                setWallys(wallyData);
            } catch (error) {
                console.error("Error fetching wallys: ", error);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <div className="wally-list">
            {wallys.map((wally, index) => (
                <Card key={index} className="wally-card">
                    <img 
                        src={wally.imageURL} 
                        alt={wally.nombre} 
                        className="wally-image" 
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/250"; 
                        }} 
                    />
                    <div className="wally-info">
                        <h2>{wally.nombre}</h2>
                        <p><strong>Departamento:</strong> {wally.departamento}</p>
                        <p><strong>Dirección:</strong> {wally.direccion}</p>
                        {wally.horario && wally.horario.length === 2 ? (
                            <p><strong>Horario:</strong> {wally.horario[0]} - {wally.horario[1]}</p>
                        ) : (
                            <p><strong>Horario:</strong> No disponible</p>
                        )}
                        <p><strong>Precio:</strong> Bs. {wally.precio}</p>
                        <p><strong>Teléfono:</strong> {wally.telefono}</p>
                    </div>
                </Card>
                
            ))}
        </div>
    );
};

export default InfoCancha;
