// EconomForm.tsx
import React, { useState } from "react";
import { Button, Card, message } from "antd";
import Meta from "antd/es/card/Meta";
import { Car } from "../models";
import axios from "axios";

interface EconomFormProps {
  carData: Car;
}

export const EconomForm: React.FC<EconomFormProps> = ({ carData }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isBooked, setBooked] = useState<boolean>(carData.taken || false);

    const handleReservation = () => {
        setLoading(true);
        axios.post(`http://localhost:5050/api/orders/${carData.id}/book`)
      .then(() => {
          setBooked(true);
          message.success("Машина успешно забронирована!");
      })
      .catch((error) => {
          console.error("Error booking car:", error);
          message.error("Ошибка при бронировании машины");
      })
      .finally(() => setLoading(false));
    };

    return (
        <Card
            hoverable
            className="w-48 h-64 m-2"
            cover={<img alt={carData.name} src={carData.img} className="object-cover h-32" />}
            >
            <Meta title={`${carData.brand} ${carData.name} ${carData.date_release}`} description={`Цена: ${carData.price}`} />
            <Button
                type="default"
                className="login-form-button mt-2"
                onClick={handleReservation}
                disabled={loading || isBooked}
                >
                {isBooked ? "Забронировано" : loading ? "Бронируется..." : "Забронировать"}
            </Button>
        </Card>
        );
};