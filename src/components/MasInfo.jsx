import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Collapse, Table } from "antd";
import { useCrmStore } from "../hooks/useCrmStore";
import { getColumns } from "../hooks/useTable.js";
import { v4 as uuidv4 } from 'uuid';
import'../assets/css/index.css'
export const MasInfo = () => {
  const [columns, setColumns] = useState([]);
  const [columnsGestion, setColumnsGestion] = useState([]);
  const { tickets, allInfo, acsaTicket,setColor,Gestiones } = useCrmStore();



  

  useEffect(() => {
    setColumns(getColumns(allInfo.company));
  }, [allInfo]);

  useEffect(() => {
    setColumnsGestion(getColumns('gestiones'));
  }, [Gestiones]);


  const dataSource = useMemo(() => {
    if (tickets && tickets.length > 0) {
      return tickets.map(item => ({ ...item, key: uuidv4() }));
    } else if (acsaTicket && acsaTicket.length > 0) {
      return acsaTicket.map(item => ({ ...item, key: uuidv4() }));
    } else {
      return [];
    }
  }, [tickets, acsaTicket]);
  

 // console.log('soy las gestiones')
  const dataSource2 = useMemo(() => {
    if (Gestiones && Gestiones.length > 0) {
      return Gestiones.map(item => ({ ...item, key: uuidv4() }));
    } else {
      return [];
    }
  }, [Gestiones]);

const count2 = dataSource2.length
  const count = dataSource.length;

  return (
    <Row gutter={[16, 16]} style={{ padding: "10px 0" }}>
      <Col span={24} xs={24} sm={24} md={24} lg={12} xl={12}>
        <Collapse
          className="custom-collapse"
          accordion
          style={{ background: 'white' }}
          items={[
            {
              key: "2",
              label: (
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <div className="deudor-info">Boletas</div>
                  <div className="deudor-info" style={{ background:setColor , color:'#ffffff', padding:'0 5px'}}>Cantidad: {count}</div>
                </div>
              ),
              children: (
                <div style={{ overflowX: "auto" }}>
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={(record) => record.key}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 800 }}
                  />
                </div>
              ),
            },
          ]}
        />
      </Col>
      <Col span={24} xs={24} sm={24} md={24} lg={12} xl={12}>
        <Collapse
          className="custom-collapse"
          accordion
          style={{ background: 'white' }}
          items={[
            {
              key: "3",
              label: (
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <div className="deudor-info">Gestiones</div>
                  <div className="deudor-info" style={{ background:setColor , color:'#ffffff', padding:'0 5px'}}>Cantidad: {count2}</div>
                </div>
              ),
              children: (
                <div style={{ overflowX: "auto" }}>
                  <Table
                    columns={columnsGestion}
                    dataSource={dataSource2}
                    rowKey={(record) => record.key}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 800 }}
                  />
                </div>
              ),
            }
          ]}
        />
      </Col>
    </Row>
  );
};
