import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import './BarraBusqueda.css';
const { Option } = Select;

const cities = ["La Paz", "Oruro", "Cochabamba", "Santa Cruz", "Tarija", "Beni", "Pando", "Potosí", "Sucre"];
const hours = Array.from({ length: 19 }, (_, i) => `${(i + 6).toString().padStart(2, '0')}:00`);



const BarraBusqueda = ({ onSearch }) => {
    const [searchName, setSearchName] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [searchHour, setSearchHour] = useState('');

    const handleSearch = () => {
        onSearch({
            name: searchName,
            city: searchCity,
            hour: searchHour
        });
    };

    return (
        <div className="search-bar">
            
            <Input
                placeholder="Buscar por nombre"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                className="search-input"
            />
            <Select
                placeholder="Buscar por ciudad"
                value={searchCity}
                onChange={value => setSearchCity(value)}
                className="search-input"
                allowClear
            >
                {cities.map(city => (
                    <Option key={city} value={city}>{city}</Option>
                ))}
            </Select>
            
            <Select
                placeholder="Buscar por horario"
                value={searchHour}
                onChange={value => setSearchHour(value)}
                className="search-input"
                allowClear
            >
                {hours.map(hour => (
                    <Option key={hour} value={hour}>{hour}</Option>
                ))}
            </Select>
            
            <Button type="primary" onClick={handleSearch} className="search-button">Buscar</Button>
        </div>
    );
};

export default BarraBusqueda;
