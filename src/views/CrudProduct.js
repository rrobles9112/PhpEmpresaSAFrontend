import React, { useEffect, useState } from "react";

import { Row, Col, Layout, Table, Button, Tooltip } from "antd";
import { useDispatch, useTrackedState } from "./../store/index";
import ModalAddEdit from "./../components/ModalCreateEdit";
import {
    EditOutlined,
    DollarOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    const state = useTrackedState();

    const columns = [
        {
            title: "Nombre",
            dataIndex: "name",
            sorter: true,
            width: "15%",
        },
        {
            title: "Referencia",
            dataIndex: "reference",
            sorter: true,
            width: "15%",
        },
        {
            title: "Precio",
            dataIndex: "price",
            sorter: true,
            width: "10%",
        },
        {
            title: "Peso",
            dataIndex: "weight",
            render: (weight) => {
                console.log(`weight ${weight}`);
                return `${weight} Kgs`;
            },
            sorter: true,
            width: "5%",
        },
        {
            title: "Categoria",
            dataIndex: "category",
            sorter: true,
            width: "7%",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            sorter: true,
            width: "5%",
        },
        {
            title: "Fecha de creacion",
            dataIndex: "created_date",
            sorter: true,
            width: "15%",
        },
        {
            title: "Fecha de ultima venta",
            dataIndex: "date_last_sell",
            sorter: true,
            width: "10%",
        },
        {
            title: "Acciones",
            width: "10%",
            render: function (text, record) {
                return (
                    <div className="text-info">
                        <Tooltip title="Editar Producto">
                            <Link to="/edit">
                                <EditOutlined
                                    style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                    }}
                                />
                            </Link>

                        </Tooltip>
                        <Tooltip title="Generar Venta">
                            <DollarOutlined
                                style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Eliminar Producto">
                            <DeleteOutlined
                                onClick={() => {
                                    console.log(record);
                                    dispatch({ type: "DELETE_PRODUCT", payload: record.id });
                                }}
                                style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            />
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const openModal = (event) => {
        console.log(state.visible);
        dispatch({ type: "VISIBLE_MODAL" });
    };

    const fetchProducts = () => {
        dispatch({ type: "FETCH_PRODUCTS" });
    };

    useEffect(() => {
        console.log("State pending", state.pending);
        fetchProducts();
    }, []);

    return (
        <>
            <div className="Row">
                <Button onClick={openModal} className="my-5" type="primary">
                    Crear Producto
                </Button>
            </div>
            <Layout.Content className="container-fluid my-5">
                <div className="container-xl mw-100">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row mb-3" span={24}>
                            <Table
                                columns={columns}
                                loading={state.pending}
                                dataSource={state.products}
                            ></Table>
                        </Col>
                    </Row>
                </div>
            </Layout.Content>
            <ModalAddEdit />
        </>
    );
}

export default React.memo(App);
