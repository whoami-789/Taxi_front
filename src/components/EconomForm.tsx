// EconomForm.tsx
import React from "react";
import {Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import kia from "../images/kia.webp";
import {Car} from "../models";


interface EconomFormProps {
    carData: Car;
}

export const EconomForm: React.FC<EconomFormProps> = ({carData}) => {

    return (
        <Card
            hoverable
            className="w-48 h-64 m-2" // Пример использования классов Tailwind
            cover={<img alt={carData.name} src={kia} className="object-cover h-32"/>}
        >
            <Meta title={`${carData.brand} ${carData.name} ${carData.date_release}`}
                  description={`Цена: ${carData.price}`}/>
            <Button type="default" className="login-form-button mt-2">
                Забронировать
            </Button>
        </Card>
    );
};
