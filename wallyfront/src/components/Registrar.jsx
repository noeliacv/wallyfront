import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import upload from "../images/subir.png";
import avatarDefault from '../images/avatar2.jpg';
import "./Registrar.css";
import {
    Form,
    Button,
    Checkbox,
    Select,
    Col,
    Row,
    Input,
    InputNumber,
    Modal
} from "antd";
import { db, auth } from "../firebase/firebase-conf";

const { Option } = Select;

function Registro() {
    const URL_DEFAULT = avatarDefault;
    const [image, setImage] = useState(URL_DEFAULT);
    const [imageFile, setImageFile] = useState(null); // Estado para almacenar el archivo de imagen
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Guardar el archivo de imagen en el estado
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (values) => {
        const formData = {
            nombre: values.nombre,
            apellido: values.apellido,
            correo: values.correo,
            contraseña: values.contraseña,
            confirmarContraseña: values.confirmarContraseña,
            genero: values.genero,
            departamento: values.departamento,
            telefono: values.telefono,
            agreement: values.agreement,
        };

        try {
            // Crear usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, formData.contraseña);
            const user = userCredential.user;

            // Subir imagen a Firebase Storage y obtener URL de descarga
            const storage = getStorage();
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            await uploadBytes(storageRef, imageFile);
            const imageURL = await getDownloadURL(storageRef);

            // Guardar datos del usuario en Firestore, incluyendo la URL de la imagen
            formData.imageURL = imageURL;
            await setDoc(doc(db, "clientes", user.uid), formData);

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
    return (
        <div className="Registro">
            <header className="Registro-header">
                <Form
                    autoComplete="off"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    onFinish={handleRegister}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="nombre"
                                label="Nombre"
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
                                <Input placeholder="Escriba su Nombre" />
                            </Form.Item>

                            <Form.Item
                                name="apellido"
                                label="Apellido"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor Ingrese su Apellido",
                                    },
                                    { whitespace: true },
                                    { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                    { max: 30, message: "El nombre no puede tener más de 30 caracteres" },
                                    { pattern: /^[a-zA-Z\s]*$/, message: "El nombre solo puede contener letras del alfabeto" },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Escriba su Apellido" />
                            </Form.Item>

                            <Form.Item
                                name="contraseña"
                                label="Contraseña"
                                rules={[
                                    {
                                        required: true, message: "Por Favor Ingrese su Contraseña"
                                    },
                                    { min: 6, message: "Debe de tener mas de 6 caracteres" },
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                                        message: "La contraseña debe contener al menos una letra mayúscula y un número"
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Escriba su Contraseña" />
                            </Form.Item>

                            <Form.Item
                                name="confirmarContraseña"
                                label="Confirme Contraseña"
                                dependencies={["contraseña"]}
                                rules={[
                                    {
                                        required: true, message: "Debe confirmar su Contraseña"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("contraseña") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                "Las contraseñas no coinciden."
                                            );
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Confirme su Contraseña" />
                            </Form.Item>

                            <Form.Item
                                name="genero"
                                label="Genero"
                                rules={[{
                                    required: true,
                                    message: "Por favor Seleccione un Genero"
                                }]}
                            >
                                <Select placeholder="Seleccione su Genero">
                                    <Option value="masculino">Masculino</Option>
                                    <Option value="femenino">Femenino</Option>
                                    <Option value="otro">Otro</Option>
                                </Select>
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
                                name="correo"
                                label="Correo"
                                rules={[
                                    {
                                        required: true,
                                        message: "Por favor Ingrese su Correo",
                                    },
                                    { type: "email", message: "Por favor Ingrese un Correo Valido" },
                                    {
                                        validator: (_, value) =>
                                            value && value.includes(".")
                                                ? Promise.resolve()
                                                : Promise.reject(""),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Escriba su Correo" />
                            </Form.Item>

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
                                {/* Tu contenido de términos y condiciones */}
                            </Modal>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button type="primary" htmlType="submit" disabled={image === URL_DEFAULT}>
                            Registrarse
                        </Button>
                    </Form.Item>
                </Form>
            </header>
        </div>
    );
}

export default Registro;
