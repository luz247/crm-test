import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, DatePicker } from "antd";
import { useCrmStore } from '../hooks/useCrmStore';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cupCall, dispoCall, makeCall } from '../helpers/getCall';
import { useAuthStore } from '../hooks/useAuthStore';
import { Formik, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../helpers/validators';
import { ArbolGestion } from './ArbolGestion';
import { PhoneOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

const sendManagement = {
  lead_id: 0,
  telefono: '',
  glosa: '',
  numdoc: 0,
  monto: 0,
  feccomp: null,
  estcomp: "Pendiente",
  tipocomp: 0,
  abono: '',
  modo: 'MANUAL',
  uniqueid: 0,
  selectedStatus: null // Añadimos el estado seleccionado aquí
};

export const FromCrm = () => {
  const location = useLocation();
  const [, cartera] = location.pathname.split("/");
  const { setColor, tree, insertDataRegister, allInfo, setChangeTree } = useCrmStore();
  const { user } = useAuthStore();
  const [resetFlag, setResetFlag] = useState(false); // Añadimos el estado de reinicio

  const formSubmit = async (values, { resetForm }) => {
    if (!tree) {
      Swal.fire("Elija una tipificación");
    } else {
      try {
        const [id,status] = values.idrespuesta.split('')
        const formattedValues = {
          ...values,
          idrespuesta: id,
          feccomp: values.feccomp ? moment(values.feccomp).format('YYYY-MM-DD') : null,
        };

        console.log(formattedValues, status, id, 'estos son los datos')

        await insertDataRegister(formattedValues);
        Swal.fire("Registro guardado exitosamente");
         await cupCall({ user: user.rut });
         await dispoCall({ user: user.rut, status });
        resetForm();
       // setChangeTree(); // Resetea el estado del ArbolGestion
        setResetFlag(true); // Activa el estado de reinicio para ArbolGestion

      } catch (error) {
        console.error("Error en el proceso de llamada:", error);
        Swal.fire("Ocurrió un error. Por favor, intente de nuevo.");
      }
    }
  };

  const calls = async (telefono) => {
    try {
      await makeCall({ user: user.rut, phono: telefono });
    } catch (error) {
      console.error("Error en la llamada:", error);
      Swal.fire("Ocurrió un error al hacer la llamada. Por favor, intente de nuevo.");
    }
  };

  return (
    <>
      <Formik
        initialValues={sendManagement}
        validationSchema={validationSchema}
        onSubmit={formSubmit}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form layout="vertical" style={{ maxWidth: "600px", margin: "0 auto" }} onFinish={handleSubmit}>
             <ErrorMessage name="idrespuesta" component="div" style={{ color: 'red', textAlign: "center" }} />
            <ArbolGestion 
              setSelectedStatus={(value) => setFieldValue("idrespuesta", value)} 
              resetFlag={resetFlag} 
              setResetFlag={setResetFlag} 
            />

            <Row style={{ display: "flex", alignItems: "center", marginBottom: "16px", justifyContent: "flex-end" }}>
              <div style={{ marginRight: "8px" }}>Fono Gestión:</div>
              <Form.Item style={{ marginBottom: 0, flex: 1 }}>
                <Field name="telefono">
                  {({ field }) => (
                    <Input
                      {...field}
                      suffix={<PhoneOutlined onClick={() => calls(values.telefono)} style={{ color: setColor, cursor: 'pointer' }} />}
                    />
                  )}
                </Field>
                <ErrorMessage name="telefono" component="div" style={{ color: 'red' }} />
              </Form.Item>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Fecha Compromiso">
                  <DatePicker
                    value={values.feccomp ? moment(values.feccomp) : null}
                    onChange={(date, dateString) => setFieldValue("feccomp", date)}
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                  />
                  <ErrorMessage name="feccomp" component="div" style={{ color: 'red' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Monto Compromiso">
                  <Field name="abono">
                    {({ field }) => <Input {...field} />}
                  </Field>
                  <ErrorMessage name="abono" component="div" style={{ color: 'red' }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Glosa">
              <Field name="glosa">
                {({ field }) => <Input.TextArea {...field} rows={4} />}
              </Field>
              <ErrorMessage name="glosa" component="div" style={{ color: 'red' }} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit" style={{ background: setColor, color: "#ffff" }}>
                GUARDAR
              </Button>
            </Form.Item>
           
          </Form>
        )}
      </Formik>
    </>
  );
};
