import React from "react";
import { AppRouters } from "./routers/AppRouters";
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from "./Store/store";
import { AllRouters } from "./routers/AllRouters";

export const AppCrms = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AllRouters></AllRouters>
      </BrowserRouter>
    </Provider>
  );
};
