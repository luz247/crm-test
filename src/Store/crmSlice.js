import { createSlice } from "@reduxjs/toolkit";

export const crmSlice = createSlice({
  name: "crm",
  initialState: {
    allInfo: [],
    clasifications: [],
    activeData: null,
    activeWallet: true,
    tickets: [],
    newEmail: [],
    newPhono: [],
    acsaTicket: [],
    acsappu:[],
    descuento:[],
    Gestiones:[],
    pageColor: {
      cnor: "linear-gradient(to bottom, #f0fff0, #d4f7d4)",
      vsur: "linear-gradient(to bottom, #f0f8ff, #d4e6f7)",
      avn: "linear-gradient(to bottom, #ffffff, #d3dcf8)",
      avo: "linear-gradient(to bottom, #e6f7ff, #ffe6cc)",
      svia: "linear-gradient(to bottom, #e6e6e6, #ffcccc)",
      global: "linear-gradient(to bottom, #f0fff0, #d4f7d9)",
      acsa: "linear-gradient(to bottom, #ffff,#FBEEE6)",
    },
    colorText: {
      cnor: "linear-gradient(to bottom, #f0fff0, #d4f7d4)",
      vsur: "linear-gradient(to bottom, #f0f8ff, #d4e6f7)",
      avn: "#005187",
      avo: "#ffa500",
      svia: "#ff6961",
      global: "#52c41a",
      acsa: "#FF9933",
    },
    changeColor: "",
    setColor: "",
    tree:true,
    changeTreeManagement:''
  },
  reducers: {
    onSetAllInfo: (state, { payload }) => {
      state.allInfo = payload;
    },
    onSetActiveData: (state, { payload }) => {
      state.activeData = payload;
    },
    onSetActiveClasification: (state, { payload }) => {
      state.clasifications = payload;
    },
    onSetActiveWallet: (state) => {
      state.activeWallet = !state.activeWallet;
    },
    onSetTickets: (state, { payload }) => {
      console.log(payload, 'soy los tickets de acsa')
      state.tickets = payload;
    },
    onSetAddEmail: (state, { payload }) => {
      state.newEmail.push(payload);
    },
    onSetAddPhone: (state, { payload }) => {
      state.newPhono.push(payload);
    },
    onGetTicketAcsa: (state, { payload }) => {
      console.log(payload,'boletas')
      state.acsaTicket =payload ;
    },
    onGetPpu: (state, { payload }) => {
      state.acsappu = payload;
    },
    onGetDescuento: (state, { payload }) => {
      state.descuento = payload;
    },
    onGetGestiones: (state, { payload }) => {
      state.Gestiones = payload;
    },
    onPaintWallet: (state, { payload }) => {
      const {path} = payload
      console.log('caballeros',path)
      state.changeColor = state.pageColor[path];
      state.setColor = state.colorText[path];
    },
    onChangeTree: (state, { payload }) => {
      state.changeTreeManagement = payload;
    },
    onSelect:(state)=>{
      state.tree = !state.tree
    },
  },
});

export const {
  onSetActiveClasification,
  onSetActiveData,
  onSetTickets,
  onSetAddPhone,
  onSetAddEmail,
  onSetActiveWallet,
  onSetAllInfo,
  onGetTicketAcsa,
  onGetPpu,
  onPaintWallet,
  onGetDescuento,
  onGetGestiones,
  onChangeTree,
  onSelect
} = crmSlice.actions;
