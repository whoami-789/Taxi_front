import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import { Car } from "../models";
import CarsForm from "../forms/CarsForm";

interface CarsListProps {}

const CarsList: React.FC<CarsListProps> = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios
      .get<Car[]>("http://localhost:5050/api/cars/all")
      .then((response) => setCars(response.data))
      .catch((error) => console.error("Error fetching cars:", error));
  };

  const handleAdd = () => {
    setVisible(true);
    setSelectedCarId(null);
  };

  const handleEdit = (carId: number) => {
    setVisible(true);
    setSelectedCarId(carId);
  };

  const handleDelete = (carId: number) => {
    axios
      .delete(`http://localhost:5050/api/cars/${carId}`)
      .then(() => {
        fetchCars();
      })
      .catch((error) => console.error("Error deleting car:", error));
  };

  const handleFormSubmit = (values: Car, carId: number | null) => {
    const endpoint = carId
    ? `http://localhost:5050/api/cars/${carId}`
    : "http://localhost:5050/api/cars";
    const method = carId ? "put" : "post";

    axios[method](endpoint, values)
    .then(() => {
      fetchCars();
      setVisible(false);
    })
    .catch((error) => console.error("Error submitting form:", error));
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Car Classes", dataIndex: "carClasses", key: "carClasses" },
    { title: "Broned", dataIndex: "taken", key: "taken" },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text: string) => (
        <img src={text} alt="Car" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Car) => (
        <>
          <Button onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button
            danger
            type="primary"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="default" onClick={handleAdd}>
        Add Car
      </Button>
      <Table dataSource={cars} columns={columns} rowKey={(car) => car.id} />

      <Modal
        title={selectedCarId ? "Edit Car" : "Add Car"}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        >
        <CarsForm carId={selectedCarId} onFormSubmit={handleFormSubmit} />
      </Modal>
    </div>
    );
};

export default CarsList;