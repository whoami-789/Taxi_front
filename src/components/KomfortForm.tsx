// KomfortForm.tsx
import React from "react";
import {Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import audi from '../images/audi.jpg';
import {Car} from "../models";

interface KomfortFormProps {
    carData: Car;
}

export const KomfortForm: React.FC<KomfortFormProps> = ({ carData }) => {


    return (
        <Card
            hoverable
            className="w-48 h-64 m-2" // Пример использования классов Tailwind
            cover={<img alt={carData.name} src={audi} className="object-cover h-32" />}
        >
            <Meta title={`${carData.brand} ${carData.name} ${carData.date_release}`} description={`Цена: ${carData.price}`} />
            <Button type="default" className="login-form-button mt-2">
                Забронировать
            </Button>
        </Card>
    );
};
