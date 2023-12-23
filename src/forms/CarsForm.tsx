import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios, {AxiosRequestConfig, AxiosResponse } from "axios";
import { Car } from "../models";

interface CarsFormProps {
  carId: number | null;
  onFormSubmit: (values: FormData, carId: number | null, config: AxiosRequestConfig) => void;
}

const CarsForm: React.FC<CarsFormProps> = ({ carId, onFormSubmit }) => {
  const [form] = Form.useForm();
  const [car, setCar] = useState<Car>({
    id: 0,
    name: "",
    brand: "",
    date_release: "",
    price: 0,
    carClasses: [],
    img: "",
    order: [],
    image: [] // Добавим свойство для изображения
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

 useEffect(() => {
    if (carId) {
      axios
        .get(`http://localhost:5050/api/cars/${carId}`)
        .then((response) => {
          form.setFieldsValue(response.data);
        })
        .catch((error) => console.error("Error fetching car:", error));
    }
  }, [carId, form]);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      // Обновляем form при успешной загрузке изображения
      form.setFieldsValue({ image: [info.file.originFileObj] });
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    // Не отправляем запрос на сервер при загрузке изображения,
    // т.к. изображение будет сохранено вместе с формой
    onSuccess({}, file);

    // Обновляем imageUrl в состоянии, чтобы отобразить изображение в форме
    setImageUrl(window.URL.createObjectURL(file));
  } catch (error) {
    console.error("Error uploading image:", error);
    onError(error);
  }
};


  const onFinish = (values: Car) => {
    // Создаем новый объект FormData
  const formData = new FormData();

  // Добавляем каждое поле в FormData
  formData.append("name", values.name);
  formData.append("brand", values.brand);
  formData.append("price", values.price.toString());
  formData.append("date_release", values.date_release);
  formData.append("carClasses", Array.isArray(values.carClasses) ? values.carClasses.join(",") : values.carClasses);
  
  // Если есть изображение, добавляем его в FormDataт
  if (values.image && Array.isArray(values.image) && values.image.length > 0) {
    formData.append("image", values.image[0]);
  }
    
    const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    };

    onFormSubmit(formData, carId, config);

  };

  
  const getUploadButton = () => (
      <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      );

  return (
      <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the car name!" }]}
              >
              <Input />
          </Form.Item>
          <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please enter the car brand!" }]}
              >
              <Input />
          </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the car price!" }]}
          >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Year Release"
          name="date_release"
          rules={[{ required: true, message: "Please enter the car year release!" }]}
          >
          <Input />
        </Form.Item>
        <Form.Item
            label="Car Classes"
            name="carClasses"
            rules={[{ required: true, message: "Please select car classes!" }]}
          >
            <Select placeholder="Select car classes">
              <Select.Option value="ЭКОНОМ">ЭКОНОМ</Select.Option>
              <Select.Option value="КОМФОРТ">КОМФОРТ</Select.Option>
              <Select.Option value="БИЗНЕС">БИЗНЕС</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Image" name="image">
              <Upload
                  name="image"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={customRequest}
                  >
                  {imageUrl ? (
                      <img src={imageUrl} alt="Car" style={{ width: "100%" }} />
                      ) : (
                        getUploadButton()
                        )}
              </Upload>
          </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      );
};

export default CarsForm;
