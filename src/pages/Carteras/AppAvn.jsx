import { Col, Row } from "antd";
import React from "react";
import { SearchData } from "../../components/SearchData";
import { ArbolGestion } from "../../components/ArbolGestion";
import { FromCrm } from "../../components/FromCrm";
import { MasInfo } from "../../components/MasInfo";

export const AppAvn = () => {
  return (
    <>
      <Row style={{ padding: "10px 0" }} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SearchData></SearchData>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ padding: "0 10px" }}
        >
          <div style={{ textAlign: "right", padding: "0px" }}>
            <FromCrm></FromCrm>
          </div>
        </Col>
      </Row>
      <MasInfo />
    </>
  );
};
