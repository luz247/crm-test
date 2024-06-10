import React, { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import { useCrmStore } from '../hooks/useCrmStore';

export const Navbar = ({ logo }) => {
  const {  setActiveUser, setInfoAll,allInfo } = useCrmStore(); // Usar offActive para cambiar el estado


  const handleMenuClick = (e, path) => {
    e.preventDefault();
    console.log("Navegación bloqueada porque ya estás en esta página.");
  };

  


  const menuItems = useMemo(() => [
    { key: 'avn', label: 'Vespucio Norte', path: '/avn/' },
    { key: 'avo', label: 'Vespucio Oriente', path: '/avo/' },
    { key: 'svia', label: 'Survia', path: '/svia/' },
    { key: 'global', label: 'Global', path: '/global/' },
    { key: 'acsa', label: 'Acsa', path: '/acsa/' }
  ].map(item => ({
    key: item.key,
    label: (
      <Link to={item.path} onClick={(e) => handleMenuClick(e, item.path)} style={{
        color: allInfo.company === item.key ? 'black' : '#c0c0c0',
        fontWeight: allInfo.company === item.key ? 'bold' : 'normal'
      }}>
        {item.label}
      </Link>
    ),
  })), [allInfo]);

  return (
    <Layout.Header style={{
      display: "flex",
      alignItems: "center",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
      padding: '0 20px',
      backgroundColor: 'white'
    }}>
      <div style={{ height: 50, width: 64 }}>
        <img src={logo} style={{ width: '100%', height: '100%' }} alt="logo" />
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[allInfo.company]}
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
          marginLeft: '20px'
        }}
      />
      
    </Layout.Header>
  );
};
