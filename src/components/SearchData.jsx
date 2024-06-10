import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Row, Col, Collapse, Card, Modal } from "antd";
import { useForm } from "../hooks/useForm";
import { useCrmStore } from "../hooks/useCrmStore";
import { collectPhoneNumbers } from "../helpers/validators";
import { PhoneOutlined, PlusOutlined, MailOutlined } from "@ant-design/icons";
import { useModalWithInput } from "../hooks/useModals";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "../helpers/getInteger";
import "../assets/css/index.css"; // Importa tu archivo CSS
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const data = { rut: "" };
const sendData = {
  NOMBRE: "",
  DETALLE_DOMICILIO: "",
  COMUNA: "",
  EMAIL: "",
  email1: "",
  email2: "",
  email3: "",
  fono1: "",
  fono2: "",
  Fono: "",
  movil1: "",
  movil2: "",
  movil3: "",
  fijo1: "",
  fijo2: "",
  fijo3: "",
  comuna_f: "",
  ciudad_f: "",
  ic: "",
  cc: "",
  rut: "",
  tramo: "",
  RUT: "",
  tipo_cobranza: '',
  Celular: ''
};

const initialValue = {
  lead_id: 0,
  rut: '',
  ruteje: '',
};

// Validaciones
const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
});

const phoneValidationSchema = Yup.object().shape({
  telefono: Yup.string()
    .matches(/^[0-9]{9}$/, "Teléfono inválido, debe tener 9 dígitos")
    .required("El teléfono es obligatorio"),
});

export const SearchData = () => {
  const location = useLocation();
  const [, cartera] = location.pathname.split("/");
  const { rut, onInputChange } = useForm(data);

  const {
    setGetData,
    activeData,
    activeWallet,
    setNewEmail,
    setNewPhono,
    newEmail = [],
    newPhono = [],
    descuento = [],
    setColor,
    allInfo
  } = useCrmStore();
  const [datas, setdatas] = useState(sendData);

  const getData = () => {
    setGetData({ path: allInfo.company, rut });
  };

  const initialData =
    activeData && activeData.length > 0 ? activeData[0] : datas;
  const uniquePhones = collectPhoneNumbers(initialData);

  const {
    isVisible: isPhoneModalVisible,
    showModal: showPhoneModal,
    handleCancel: handlePhoneCancel,
  } = useModalWithInput(initialValue);

  const {
    isVisible: isEmailModalVisible,
    showModal: showEmailModal,
    handleCancel: handleEmailCancel,
  } = useModalWithInput(initialValue);

  const handlePhoneOk = ({ telefono }) => {
    console.log(telefono, 'soy values phpone')
    const valu = {
      ...initialValue,
      telefono
    }
    setNewPhono(valu);
    handlePhoneCancel();
  };

  const handleEmailOk = ({ email }) => {
    console.log(email, 'soy values mail ')
    const valu = {
      ...initialValue,
      email
    }
    setNewEmail(valu);
    handleEmailCancel();
  };

  const llamar = (e) => {
    e.preventDefault();
    console.log('estoy llamando');
  };

  const callbase = (e, phone) => {
    e.preventDefault();
    console.log(e, phone);
  }

  console.log(descuento, 'soy descuento')

  return (
    <Card
      title="Informacion Deudor"
      bordered={false}
      style={{ width: "100%", textAlign: "center" }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span
          className="deudor-info"
          style={{
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Rut:
        </span>

        {activeWallet ? (
          <>
            <Input
              style={{ flex: 1, marginRight: "10px" }}
              onChange={onInputChange}
              name="rut"
            />
            <Button
              style={{
                backgroundColor: setColor,
                color: "#FFFFFF",
              }}
              onClick={getData}
            >
              Search
            </Button>
          </>
        ) : (
          <span className="deudor-info">
            {" "}
            {initialData.rut || initialData.RUT}{" "}
          </span>
        )}
      </Row>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span
          className="deudor-info"
          style={{
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Nombre:
        </span>
        <span className="deudor-info">
          {" "}
          {initialData.nombre || initialData.NOMBRE}{" "}
        </span>
      </Row>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span
          className="deudor-info"
          style={{
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Dirección:
        </span>
        <span className="deudor-info">
          {" "}
          {initialData.DETALLE_DOMICILIO ||
            initialData.direccion_contractual}{" "}
        </span>
      </Row>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span
          className="deudor-info"
          style={{
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Comuna:
        </span>
        <span className="deudor-info">
          {" "}
          {initialData.COMUNA || initialData.comuna}{" "}
        </span>
      </Row>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            className="deudor-info"
            style={{
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Email:
          </span>
          <span className="deudor-info">
            {" "}
            {initialData.EMAIL || initialData.email1}{" "}
          </span>
          {newEmail.length > 0
            ? newEmail.map((email, index) => (
              <span
                key={`email-${index}`}
                className="deudor-info"
                style={{ marginRight: "10px" }}
              >
                {email}
              </span>
            ))
            : ""}
        </div>
        <Button
          type="link"
          className="deudor-info-botton"
          onClick={showEmailModal}
          style={{
            background: setColor,
            color: "white",
            marginLeft: "10px",
          }}
        >
          <PlusOutlined /> <MailOutlined />
        </Button>
        <Modal
          title="Agregar Nuevo Email"
          open={isEmailModalVisible}
          onCancel={handleEmailCancel}
          footer={null}
        >
          <Formik
            initialValues={{ email: '' }}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailOk}
          >
            {({ handleSubmit }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item>
                  <Field name="email">
                    {({ field }) => (
                      <Input {...field} placeholder="Ingrese nuevo Email" />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit">
                    OK
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Modal>
      </Row>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            className="deudor-info"
            style={{
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Telefonos:
          </span>
          {Array.from(uniquePhones).map((phone, index) => (
            <span
              key={`phone-${index}`}
              className="deudor-info"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <PhoneOutlined onClick={(e) => callbase(e, phone)} style={{ marginRight: "4px", color: setColor, cursor: 'pointer' }} />
              {phone}
            </span>
          ))}
          {newPhono &&
            newPhono.length > 0 &&
            newPhono.map((phone, index) => (
              <span
                key={`new-phone-${index}`}
                className="deudor-info"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <PhoneOutlined

                  onClick={llamar}
                  style={{ marginRight: "4px", color: setColor }}
                />
                {phone}
              </span>
            ))}
        </div>

        <Button
          type="link"
          onClick={showPhoneModal}
          className="deudor-info-botton"
          style={{
            background: setColor,
            color: "white",
            marginLeft: "10px",
          }}
        >
          <PlusOutlined /> <PhoneOutlined />
        </Button>
        <Modal
          title="Agregar Nuevo Teléfono"
          open={isPhoneModalVisible}
          onCancel={handlePhoneCancel}
          footer={null}
        >
          <Formik
            initialValues={{ telefono: '' }}
            validationSchema={phoneValidationSchema}
            onSubmit={handlePhoneOk}
          >
            {({ handleSubmit }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item>
                  <Field name="telefono">
                    {({ field }) => (
                      <Input {...field} placeholder="Ingrese nuevo teléfono" />
                    )}
                  </Field>
                  <ErrorMessage name="telefono" component="div" style={{ color: 'red' }} />
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit">
                    OK
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Modal>
      </Row>
      <Row>
        <Col>
          <div></div>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px", position: "relative" }}>
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <Collapse
            style={{ width: "100%" }}
            className="custom-collapse"
            accordion
            items={[
              {
                key: "1",
                label: (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Deuda</div>
                    {initialData.monto && (
                      <div
                        style={{
                          background: setColor,
                          color: "#fff",
                          padding: "5px 10px",
                        }}
                        className="deudor-info"
                      >
                        Monto:
                        {formatCurrency(initialData.monto)}{" "}
                      </div>
                    )}
                    {initialData.dias && (
                      <div
                        style={{
                          background: setColor,
                          color: "#fff",
                          padding: "5px 10px",
                        }}
                        className="deudor-info"
                      >
                        Mora:
                        {initialData.dias}
                      </div>
                    )}
                    {initialData.ic && (
                      <div
                        style={{
                          background: setColor,
                          color: "#fff",
                          padding: "5px 10px",
                        }}
                        className="deudor-info"
                      >
                        IC:
                        {initialData.ic}
                      </div>
                    )}

                    {initialData.ic && (
                      <div
                        style={{
                          background: setColor,
                          color: "#fff",
                          padding: "5px 10px",
                        }}
                        className="deudor-info"
                      >
                        CC:
                        {initialData.cc}
                      </div>
                    )}
                    {initialData.tramo && (
                      <div
                        style={{
                          background: setColor,
                          color: "#fff",
                          padding: "5px 10px",

                        }}
                        className="deudor-info"
                      >
                        {initialData.tramo}
                      </div>
                    )}
                  </div>
                ),
                children: (
                  <div style={{ textAlign: 'start', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ marginBottom: '5px' }}>
                        {formatCurrency(
                          initialData.MONTO ||
                          initialData.DEUDA ||
                          initialData.monto
                        )}{" "}
                      </span>
                      <div>
                        {initialData.tipo_cobranza}
                      </div>
                    </div>
                    <div>
                      {descuento[0] && (descuento[0].descuento_total || descuento[0].deuda_total) && (
                        <div>
                          {descuento[0].descuento_total && (
                            <div
                              style={{
                                background: '#58D68D',
                                color: "#fff",
                                padding: "5px 10px",
                              }}
                              className="deudor-info"
                            >
                              Descuento: {formatCurrency(descuento[0].descuento_total)}
                            </div>
                          )}
                          {descuento[0].deuda_total && (
                            <div
                              style={{
                                background: '#58D68D',
                                color: "#fff",
                                padding: "5px 10px",
                              }}
                              className="deudor-info"
                            >
                              Total: {formatCurrency(descuento[0].deuda_total - descuento[0].descuento_total)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
};
