import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-conf';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Card, Button, Modal, Form, Input, DatePicker, TimePicker, Col, Row, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import BarraBusqueda from './BarraBusqueda';
import './InfoTorneo.css';

const InfoTorneos = () => {
    const [torneos, setTorneos] = useState([]);
    const [filteredTorneos, setFilteredTorneos] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTorneo, setSelectedTorneo] = useState(null);
    const [form] = Form.useForm();


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
                setFilteredTorneos(torneoData);
            } catch (error) {
                console.error("Error fetching torneos: ", error);
            }
        };

        fetchData();
    }, []);


    const showModal = (torneo) => {
        setSelectedTorneo(torneo);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleReserve = async (values) => {
        try {
            const { nombre, jugadores, telefono } = values;


            await addDoc(collection(db, 'inscripciones'), {
                da: nombre,
                jugadores: jugadores,
                Telefono: telefono,
                toneoID: selectedTorneo.id
            });
            console.log('Reserva guardada exitosamente');
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
        } finally {
            setIsModalVisible(false);
            form.resetFields();
        }
    };

    console.log('Datos mostrados', torneos.id)

    const handleSearch = (criteria) => {
        const { name, city, hour } = criteria;
        console.log('Search criteria:', criteria);
        console.log('Datos mostrados', torneos) 
        const filtered = torneos.filter(torneo => {
            const matchName = name ? torneo.nombre.toLowerCase().includes(name.toLowerCase()) : true;
            const matchCity = city ? torneo.departamento.toLowerCase() === city.toLowerCase() : true;
            const matchHour = hour ? torneo.horario.includes(hour) : true;
            return matchName && matchCity && matchHour;
        });
        console.log('Filtered results:', filtered);
        setFilteredTorneos(filtered);
    };


    return (
        <div>
            <div className="bar">
                <BarraBusqueda onSearch={handleSearch} />
            </div>
            <div className="torneo-list">
                {filteredTorneos.map((torneo, index) => (
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
                            <Button type="primary" className='btn-tor' onClick={() => showModal(torneo)}>
                                Inscribirte
                            </Button>
                        </div>
                    </Card>

                ))}


                <Modal
                    title={`Reservar ${selectedTorneo?.nombre}`}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} onFinish={handleReserve}>
                        <Form.Item
                            name="nombre"
                            label="Nombre del Equipo"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor Ingrese su Nombre",
                                },
                                { whitespace: true },
                                { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                { max: 30, message: "El nombre no puede tener más de 30 caracteres" },
                                { pattern: /^[a-zA-Z\s]*$/, message: "El nombre solo puede contener letras del alfabeto" },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Escriba el Nombre del Equipo" />
                        </Form.Item>
                        <Form.List name="jugadores">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKeys, ...restField }) => (
                                        <Row key={key} gutter={[16, 16]}>
                                            <Col span={20}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'jugador']}
                                                    fieldKeys={[fieldKeys, 'jugador']}
                                                    rules={[{ required: true, message: 'Por favor ingrese a los jugadores' }]}
                                                >
                                                    <Input placeholder="Ingrese Jugadores" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Agregar Jugador
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item
                            name="telefono"
                            label="Teléfono"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor Ingrese su Teléfono',
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        if (!Number.isInteger(value)) {
                                            return Promise.reject(new Error('Ingrese un número de teléfono válido'));
                                        }
                                        if (value < 0) {
                                            return Promise.reject(new Error('Ingrese un número de teléfono válido'));
                                        }
                                        const phoneNumber = value.toString();
                                        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
                                            return Promise.reject(new Error('El número de teléfono debe tener entre 7 y 10 dígitos'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder='Escriba su Teléfono' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                Inscribirme
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default InfoTorneos;
