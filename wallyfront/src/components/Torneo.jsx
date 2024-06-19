import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { setDoc, doc, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import upload from "../images/subir.png";
import avatarDefault from '../images/avatar2.jpg';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "./Torneo.css";

import {
    Form,
    Button,
    Checkbox,
    Select,
    Col,
    Row,
    Input,
    InputNumber,
    Modal,
    Result,
    TimePicker,
    DatePicker,
    Space
} from "antd";
const { RangePicker } = DatePicker;
import { db, auth } from "../firebase/firebase-conf";

const { Option } = Select;

function Torneo({user_ID}) {
    const URL_DEFAULT = avatarDefault;
    const [image, setImage] = useState(URL_DEFAULT);
    const [imageFile, setImageFile] = useState(null);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    console.log("Id de usuario", user_ID)
    const handleRegister = async (values) => {
        const horario = values.horario ? values.horario.map(time => time.format('HH:mm')) : null;
        const fechas = values.fechas ? values.fechas.map(date => date.toDate()) : null;
        const formData = {
            nombre: values.nombreTorneo,
            nombreWally: values.nombreWally,
            ubicacion: values.ubicacion,
            horario: horario,
            fecha: fechas,
            departamento: values.departamento,
            jugadores: values.jugadores,
            telefono: values.telefono,
            userID: user_ID,
            premios: values.premios || [] 
        };

        try {
            const userID = String(user_ID);
    
            const docRef = await addDoc(collection(db, "torneo"), formData);
            const generatedID = docRef.id;

            const storage = getStorage();
            const storageRef = ref(storage, `torneo_pictures/${generatedID}`);
            await uploadBytes(storageRef, imageFile);
            const imageURL = await getDownloadURL(storageRef);
    
            await setDoc(doc(db, "torneo", generatedID), { ...formData, imageURL });
    
            setRegistroExitoso(true);
            toast.success("El Usuario Fue Registrado Exitosamente!", {
                position: "top-center"
            });
        } catch (e) {
            console.error("Error al agregar documento: ", e);
            toast.error(e.message, {
                position: "bottom-center"
            });
        }
    };

    const mostrarTerminosCondiciones = () => {
        setVisible(true);
    };

    const cerrarModal = () => {
        setVisible(false);
    };

    useEffect(() => {
        const checkForm = async () => {
            try {
                await form.validateFields();
                setIsButtonDisabled(image === URL_DEFAULT);
            } catch {
                setIsButtonDisabled(true);
            }
        };

        checkForm();
    }, [form, image]);

    return (
        <div className="Registro">
            <header className="Registro-header">
                <Form
                    autoComplete="off"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    onFinish={handleRegister}
                    onFieldsChange={() => setIsButtonDisabled(false)}

                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="nombreTorneo"
                                label="Nombre Torneo"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor Ingrese su Nombre del Torneo",
                                    },
                                    { whitespace: true },
                                    { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                    { max: 30, message: "El nombre no puede tener más de 30 caracteres" },
                                    { pattern: /^[a-zA-Z\s]*$/, message: "El nombre solo puede contener letras del alfabeto" },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Ingrese el nombre del Torneo" />
                            </Form.Item>

                            <Form.Item
                                name="nombreWally"
                                label="Nombre Wally"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor Ingrese su Nombre del Torneo",
                                    },
                                    { whitespace: true },
                                    { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                    { max: 30, message: "El nombre no puede tener más de 30 caracteres" },
                                    { pattern: /^[a-zA-Z\s]*$/, message: "El nombre solo puede contener letras del alfabeto" },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Ingrese el nombre del Wally donde sera el torneo" />
                            </Form.Item>

                            <Form.Item
                                name="ubicacion"
                                label="Ubicacion"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor la Ubicacion del Wally",
                                    },
                                    { whitespace: true },
                                    { min: 2, message: "La ubicacion debe tener al menos 2 caracteres" },
                                    { max: 30, message: "La ubicacion no puede tener más de 30 caracteres" },
                                    { pattern: /^[a-zA-Z\s]*$/, message: "La ubicacion solo puede contener letras del alfabeto" },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Ingrese la Ubicacion del Wally" />
                            </Form.Item>

                            <Form.Item
                                name="horario"
                                label="Seleccione Horario"
                                rules={[{
                                    required: true,
                                    message: "Por favor Seleccione hora de apertura y cierre"
                                }]}
                                hasFeedback
                            >
                                <TimePicker.RangePicker
                                    format="HH:mm"
                                    placeholder={['Apertura', 'Cierre']}
                                />
                            </Form.Item>

                            <Form.Item
                                name="fechas"
                                label="Seleccione Fechas"
                                rules={[{
                                    required: true,
                                    message: "Por favor Seleccione hora de apertura y cierre"
                                }]}
                                hasFeedback
                            >
                                <RangePicker 
                                    placeholder={['Inicio', 'Fin']}
                                />
                            </Form.Item>

                            <Form.Item name="departamento"
                                label="Departamento"
                                rules={[{
                                    required: true,
                                    message: "Por favor Seleccione un Departamento"
                                }]}
                            >
                                <Select placeholder="Seleccione su Departamento">
                                    <Option value="la paz">La Paz</Option>
                                    <Option value="santa cruz">Santa Cruz</Option>
                                    <Option value="cochabamba">Cochabamba</Option>
                                    <Option value="oruro">Oruro</Option>
                                    <Option value="sucre">Sucre</Option>
                                    <Option value="tarija">Tarija</Option>
                                    <Option value="potosi">Potosí</Option>
                                    <Option value="beni">Beni</Option>
                                    <Option value="pando">Pando</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="jugadores"
                                label="Numero Max. Jugadores"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor Ingrese el Numero Maximo de Jugadores',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            if (!Number.isInteger(value)) {
                                                return Promise.reject(new Error('Ingrese un monto valido'));
                                            }
                                            if (value < 0) {
                                                return Promise.reject(new Error('Ingrese un monto valido'));
                                            }
                                            const phoneNumber = value.toString();
                                            if (phoneNumber.length < 1 || phoneNumber.length > 2) {
                                                return Promise.reject(new Error('El precio debe estar entre el rango Bs. 10 a Bs. 99'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} placeholder='Numero Maximo de Jugadores' />
                            </Form.Item>

                            <Form.Item
                                name="telefono"
                                label="Teléfono de Contacto"
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

                            
                        </Col>
                        <Col>
                            <div className="subir-foto">
                                <h2 style={{ textAlign: 'center', padding: '5px' }}>Añadir Foto de Perfil </h2>
                                <img
                                    src={image}
                                    alt="cargando imagen"
                                    width={"250px"}
                                    height={"280px"}
                                    style={{ borderRadius: "30px" }}
                                />

                                <input
                                    type="file"
                                    id='file-input'
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="file-input" className="upload-icon">
                                    <img src={upload} alt="subir archivo" width={'30px'} height={'30px'} />
                                </label>
                            </div>
                            {/* Agregar premios */}
                            <Form.List name="premios">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Row key={key} gutter={[16, 16]}>
                                                <Col span={20}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'premio']}
                                                        fieldKey={[fieldKey, 'premio']}
                                                        rules={[{ required: true, message: 'Por favor ingrese un premio' }]}
                                                    >
                                                        <Input placeholder="Ingrese el premio" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={4}>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Col>
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Agregar Premio
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    <Form.Item
                        name="agreement"
                        wrapperCol={{ offset: 7, span: 24 }}
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                            "Para continuar, debe de aceptar los términos y condiciones"
                                        ),
                            },
                        ]}
                    >
                        <Checkbox>
                            {" "}
                            Aceptar nuestros, <a href="#" onClick={mostrarTerminosCondiciones}>Términos y condiciones</a>
                            <Modal
                                visible={visible}
                                onCancel={cerrarModal}
                                footer={null}
                            >
                                <h1>Términos y Condiciones</h1>
                               
                            </Modal>
                        </Checkbox>
                    </Form.Item>
                    {registroExitoso && (
                        <div className="mensaje-flotante">
                            <Result
                                status="success"
                                title="Felicidades! Tu registro fue exitoso!"
                                subTitle="Ahora podras comensar a disfrutar de lo mejor de nuestra comunidad."
                                extra={[
                                    <Button type="primary" key="console"><NavLink to='/ConoceMas'>Comenzar</NavLink></Button>

                                ]}
                            />
                        </div>
                    )}
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
                            Registrar Torneo
                        </Button>
                    </Form.Item>
                </Form>
            </header>
            {registroExitoso && (
                <div className="mensaje-flotante">
                    <Result
                        status="success"
                        title="Felicidades! Tu registro fue exitoso!"
                        subTitle="Ahora podras comensar a disfrutar de lo mejor de nuestra comunidad."
                        extra={[
                            <Button type="primary" key="console"><NavLink to='/'>Comenzar</NavLink></Button>
                        ]}
                    />
                </div>
            )}
        </div>
    );
}

export default Torneo;
