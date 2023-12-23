import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../AuthContext';
import {KomfortForm} from '../components/KomfortForm';
import {EconomForm} from '../components/EconomForm';
import {BuisenesForm} from '../components/Buisenes';

interface Car {
    id: number;
    name: string;
    brand: string;
    date_release: string;
    price: number;
    img: string;
    taken?: boolean;
    carClasses: ["КОМФОРТ" | "ЭКОНОМ" | "БИЗНЕС"];
    order: any[];
    image: File[]; // Добавим свойство для изображения
}

const ClientPage: React.FC = () => {
    const {token} = useAuth();
    const [cars, setCars] = React.useState<Car[]>([]);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        axios.get<Car[]>('http://localhost:5050/api/cars/all')
            .then(response => setCars(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [token]);


    const renderCarsByClass = (carClass: "КОМФОРТ" | "ЭКОНОМ" | "БИЗНЕС") => {
        const filteredCars = cars.filter(car => car.carClasses[0] === carClass);

        return (
            <div className={`mb-8 md:mb-16 lg:mb-20 ${filteredCars.length ? '' : 'hidden'}`}>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mt-4 mb-2">{carClass}</h2>
                <div className="flex mb-4 overflow-hidden">
                    {filteredCars.map(car => {
                        switch (carClass) {
                            case 'КОМФОРТ':
                                return <KomfortForm key={car.id} carData={car}/>;
                            case 'ЭКОНОМ':
                                return <EconomForm key={car.id} carData={car}/>;
                            case 'БИЗНЕС':
                                return <BuisenesForm key={car.id} carData={car}/>;
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 mb-8">Наш автопарк</h1>

            {renderCarsByClass('ЭКОНОМ')}
            {renderCarsByClass('КОМФОРТ')}
            {renderCarsByClass('БИЗНЕС')}

        </div>
    );
};

export default ClientPage;
