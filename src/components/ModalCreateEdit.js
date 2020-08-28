import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Button, Checkbox, Select } from "antd";
import { useDispatch, useTrackedState } from "./../store/index";

const Option = Select.Option;
function ModalCreateEdit(props) {
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

  const showModal = () => {
    dispatch({ type: "VISIBLE_MODAL" });
  };

  const handleOk = (e) => {
    console.log(e, form.values);
    /* form.submit(); */
    /* form.onFormFinish((values) => {
      console.log(values);
    }); */
    // dispatch({ type: "VISIBLE_MODAL" });
  };

  const handleCancel = (e) => {
    console.log(e);
    dispatch({ type: "VISIBLE_MODAL" });
  };
  useEffect(() => {
    console.log("mounted");
    if (props.edit === true) {
      form.setFieldsValue({
        name: props.record.name,
      });
    }
  });


  return (
    <Modal
      title={`${props.edit === true ? "Edit" : "Crear"} Producto`}
      visible={state.visible}
      onOk={handleOk}
      footer={null}
      onCancel={handleCancel}
    >
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
    </Modal>
  );
}

export default ModalCreateEdit;
