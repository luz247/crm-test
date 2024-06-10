import React, { useEffect } from "react";
import Layout, { Content } from "antd/es/layout/layout";
import { useCrmStore } from "../hooks/useCrmStore";
import { useLocation } from "react-router-dom";


export const AppCarteras = ({ backgroundGradient, children }) => {
  const { startLoadingClasifications,setInfoAll} = useCrmStore();


  useEffect(() => {
  
    startLoadingClasifications();
    

  }, []);

  return (
    <>
      <Layout style={{ marginTop: "50px" }}>
        <Content style={{ padding: "20px", background: backgroundGradient }}>
          {children}
        </Content>
      </Layout>
    </>
  );
};
