// BuisenesForm.tsx
import React from "react";
import {Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import bmw from "../images/bmw.jpg";
import {Car} from "../models";

interface BuisenesFormProps {
    carData: Car;
}

export const BuisenesForm: React.FC<BuisenesFormProps> = ({ carData  }) => {


    return (
        <Card
            hoverable
            className="w-48 h-64 m-2" // Пример использования классов Tailwind
            cover={<img alt={carData.name} src={bmw} className="object-cover h-32" />}
        >
            <Meta title={`${carData.brand} ${carData.name} ${carData.date_release}`} description={`Цена: ${carData.price}`} />
            <Button type="default" className="login-form-button mt-2">
                Забронировать
            </Button>
        </Card>
    );
};
