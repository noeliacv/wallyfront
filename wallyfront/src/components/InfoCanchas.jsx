import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-conf';
import { collection, getDocs,addDoc } from 'firebase/firestore';
import { Card, Button, Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import BarraBusqueda from './BarraBusqueda';
import moment from 'moment';
import './InfoCanchas.css';

const InfoCancha = () => {


    const [wallys, setWallys] = useState([]);
    const [filteredWallys, setFilteredWallys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedWally, setSelectedWally] = useState(null);
    const [form] = Form.useForm();

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
                setFilteredWallys(wallyData);
            } catch (error) {
                console.error("Error fetching wallys: ", error);
            }
        };

        fetchData();
    }, []);

    const showModal = (wally) => {
        setSelectedWally(wally);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleReserve = async (values) => {
        try {
            const { date, time, hours } = values;

            // Convertir la fecha y hora a cadenas de texto
            const formattedDate = date.format('YYYY-MM-DD');
            const formattedTime = time.format('HH:mm');

            await addDoc(collection(db, 'reservas'), {
                date: formattedDate,
                time: formattedTime,
                hours,
                wallyId: selectedWally.id
            });
            console.log('Reserva guardada exitosamente');
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
        } finally {
            setIsModalVisible(false);
            form.resetFields();
        }
    };
    
    console.log('Datos mostrados', wallys.id) 

    const handleSearch = (criteria) => {
        const { name, city, hour } = criteria;
        console.log('Search criteria:', criteria);
        console.log('Datos mostrados', wallys) // <-- Añade este log
        const filtered = wallys.filter(wally => {
            const matchName = name ? wally.nombre.toLowerCase().includes(name.toLowerCase()) : true;
            const matchCity = city ? wally.departamento.toLowerCase() === city.toLowerCase() : true;
            const matchHour = hour ? wally.horario.includes(hour) : true;
            return matchName && matchCity && matchHour;
        });
        console.log('Filtered results:', filtered); // <-- Añade este log
        setFilteredWallys(filtered);
    };
    


    return (
        <div>
            <div className="bar">
                <BarraBusqueda onSearch={handleSearch} />
            </div>
            <div className="wally-list">
                {filteredWallys.map((wally, index) => (
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
                            <Button type="primary" onClick={() => showModal(wally)}>
                                Reservar Wally
                            </Button>
                        </div>
                    </Card>
                ))}
                <Modal
                    title={`Reservar ${selectedWally?.nombre}`}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} onFinish={handleReserve}>
                        <Form.Item
                            name="date"
                            label="Día"
                            rules={[{ required: true, message: 'Por favor selecciona el día!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Hora"
                            rules={[{ required: true, message: 'Por favor selecciona la hora!' }]}
                        >
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                        <Form.Item
                            name="hours"
                            label="Cantidad de horas"
                            rules={[{ required: true, message: 'Por favor ingresa la cantidad de horas!' }]}
                        >
                            <Input type="number" min={1} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Reservar
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default InfoCancha;
