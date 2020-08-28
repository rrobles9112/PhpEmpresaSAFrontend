import React from "react";
import {Link} from "react-router-dom";

import {  Form, Input, Button, Select } from "antd";
import { useDispatch, useTrackedState } from "./../store/index";


function ModalCreateEdit(props) {
    const Option = Select.Option;
    const dispatch = useDispatch();
    const state = useTrackedState();
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
        console.log("Success:", values);
        dispatch({ type: "SAVE_PRODUCTS", payload: values });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (

        <div className="container my-5">
            <div className="row justify-content-center ">
                <div className="col-12 my-5">
                    <Link to='/'>
                        <Button type='primary'> Ir Atras</Button>
                    </Link>

                </div>
                <div className="col-12">
                    <Form
                        {...layout}
                        name="basic"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Nombre"
                            name="name"
                            rules={[{ required: true, message: "Este campo es requerido!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="referancia"
                            name="reference"
                            rules={[{ required: true, message: "Este campo es requerido!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Precio"
                            name="price"
                            rules={[
                                { required: true, message: "Este campo es requerido!" },
                                /* { type: "number", message: "Debes escribir un numero entero" }, */
                            ]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>

                        <Form.Item
                            label="Peso en KG"
                            name="weight"
                            rules={[
                                { required: true, message: "Este campo es requerido!" },
                                /*  { type: "number", message: "Debes escribir un numero entero" }, */
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Categoria"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Seleccione una categoria" allowClear>
                                <Option value="Alimientacion">Alimientacion</Option>
                                <Option value="Medicina">Medicina</Option>
                                <Option value="Tecnologia">Tecnologia</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="En existencia"
                            name="stock"
                            rules={[
                                { required: true, message: "Este campo es requerido!" },
                                /*  { type: "number", message: "Debes escribir un numero entero" }, */
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </div>
    );
}

export default ModalCreateEdit;
