import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import cnortLogo from "../../assets/imgs/cnort.png";
import svurLogo from "../../assets/imgs/vsur.png";
import avnLogo from "../../assets/imgs/avn.jpg";
import avoLogo from "../../assets/imgs/avo.png";
import globalLogo from "../../assets/imgs/global.png";
import acsaLogo from "../../assets/imgs/acsa.png";
import defaultLogo from "../../assets/imgs/uno.jpeg";
import svia from "../../assets/imgs/sv.jpg";
import { AppAvn } from "../pages/Carteras/AppAvn";
import { AppCnor } from "../pages/Carteras/AppCnor";
import { AppSvia } from "../pages/Carteras/AppSvia";
import { AppVsur } from "../pages/Carteras/AppVsur";
import { AppAcsa } from "../pages/Carteras/AppAcsa";
import { AppGlobal } from "../pages/Carteras/AppGlobal";
import { AppAvo } from "../pages/Carteras/AppAvo";
import { AppCarteras } from "../pages/AppCarteras";
import { useCrmStore } from "../../hooks/useCrmStore";

export const AppRouters = () => {
  const [logo, setLogo] = useState(defaultLogo);
  const location = useLocation();
  const { changeColor } = useCrmStore();

  const [, cartera] = location.pathname.split("/");
  console.log(cartera);
  const params = new URLSearchParams(location.search);
  const vendorId = params.get("vendor_id");
  const hasFetchedData = useRef(false);

  return (
    <div>
      <Navbar logo={logo} />
      <AppCarteras backgroundGradient={changeColor}>
        <Routes>
          <Route path="avn/*" element={<AppAvn />} />
          <Route path="cnor/*" element={<AppCnor />} />
          <Route path="svia/*" element={<AppSvia />} />
          <Route path="vsur/*" element={<AppVsur />} />
          <Route path="acsa/*" element={<AppAcsa />} />
          <Route path="global/*" element={<AppGlobal />} />
          <Route path="avo/*" element={<AppAvo />} />
          <Route path="*" element={<AppCarteras />} /> {/* Ruta por defecto */}
        </Routes>
      </AppCarteras>
    </div>
  );
};
