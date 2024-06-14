import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from '../images/logo-inicio.png';
import user_1 from '../images/user-1.png';
import "./NavbarUsuario.css";
import { auth } from "../firebase/firebase-conf";

export const NavbarUsuario = ({ userData, userID }) => {
    const location = useLocation();

    const [fijar, setFijar] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const clickOutsideRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname === "/") {
                setFijar(window.scrollY > 50);
            } else {
                setFijar(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    {/*if (!userData) {
        return <div>Loading...</div>;
    }*/}

    const userAvatar = userData?.imageURL ? userData.imageURL : user_1;

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/";
            console.log("Sesion cerrada, exitosamente");
        } catch (error) {
            console.error("Error al Cerrar Sesion", error.message);
        }
    }

    console.log(userID);

    return (
        <nav className={`navRegistro bar ${fijar ? 'dark-bar' : ''}`}>
            <Link to="/" className="title">
                <img src={logo} alt="" className="logo" />
            </Link>
            <ul>
                <li><NavLink to='/'>Inicio</NavLink></li>
                <li><NavLink to='/Busqueda'>Buscar Wally</NavLink></li>
                <li><NavLink to='/Solicitudes'>Historial</NavLink></li>
                {/*<li>Tu Wally</li>*/}
                <li>
                    <div className="user-menu" ref={menuRef}>
                        <div className="user-avatar" onClick={toggleMenu}>
                            <img src={userAvatar} alt="Usuario" />
                        </div>
                        {menuOpen && (
                            <div className="menu-options">
                                <ul>
                                <li><NavLink to='/RegistrarWally'>Registrar Wally</NavLink></li>
                                <li><NavLink to='/RegistrarTorneo'>Registrar Torneo</NavLink></li>
                                    <li><NavLink to='/PerfilUsuario'>Ver Perfil</NavLink></li>
                                    <li><NavLink to='/EditarPerfil'>Editar Perfil</NavLink></li>
                                    <li onClick={handleLogout}>Cerrar sesión</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarUsuario;