import { useDispatch, useSelector } from "react-redux";
import crmApi from "../Api/crmApi";
import {
  onSetActiveClasification,
  onSetActiveData,
  onSetTickets,
  onSetAddEmail,
  onSetAddPhone,
  onSetActiveWallet,
  onSetAllInfo,
  onGetTicketAcsa,
  onGetPpu,
  onPaintWallet,
  onGetDescuento,
  onGetGestiones,
  onChangeTree,
  onSelect
} from "../Store/crmSlice";


export const useCrmStore = () => {
  const {
    clasifications,
    activeWallet,
    allInfo,
    activeData,
    tickets,
    newEmail,
    newPhono,
    acsaTicket,
    changeColor,
    setColor,
    descuento,
    Gestiones,
    active,
    tree,
    changeTreeManagement

  } = useSelector((state) => state.crm);
const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLoadingClasifications = async () => {
    try {
      const data = (await crmApi.get("/tipificaciones-report/")).data;
      dispatch(onSetActiveClasification(data));
    } catch (error) {
      console.error("Error loading classifications:", error);
    }
  };

  const setGetData = async ({ path, rut }) => {
    try {
      const data = await (
        await crmApi.get(`/consulta-rut-${path}/${rut}/`)
      ).data;

      dispatch(onSetActiveData(data));

      if (path === "acsa") {
        console.log(path,'boletas')
        const boletas = await (
          await crmApi.get(`/boleta-${path}/${rut}/`)
        ).data;

        dispatch(onGetTicketAcsa(boletas));

        const ppu = await (await crmApi.get(`/ppu-${path}/${rut}/`)).data;

        dispatch(onGetPpu(ppu));

        const descuento = await (
          await crmApi.get(`/descuento-${path}/${rut}/`)
        ).data;

        dispatch(onGetDescuento(descuento));
      } else {
        const ticket = await (
          await crmApi.get(`/cartera-${path}/${rut}/`)
        ).data;
        dispatch(onSetTickets(ticket));
      }
      const gestiones = await (
        await crmApi.get(`/listar-gestiones-${path}/${rut}/`)
      ).data;
      console.log(gestiones)
      dispatch(onGetGestiones(gestiones));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const insertDataRegister = async ( formState ) => {
    const combinedData = {
      ...formState,
      ruteje:user.rut, 
      rut: activeData[0].rut || activeData[0].RUT
  };
    console.log(combinedData)
   const data = await (
      await crmApi.post(
        `/insertar-registro-contacto-${allInfo.company}/`,
        combinedData
      )
    ).data;
  
console.log(data,'regreso')
    
  };

  const setNewEmail = async (dataEmail) => {
    try {

      console.log(dataEmail,'es mail')
      const newEmail  ={
        ...dataEmail,
        rut: activeData[0].rut || activeData[0].RUT,
        ruteje:user.rut
      }
      const email = await (
        await crmApi.post(`/insertar-NewEmail-${allInfo.company}/`, newEmail)
      ).data;
      console.log(email,allInfo.company)
      dispatch(onSetAddEmail(dataEmail["email"]));

    } catch (error) {
      console.log(error);
    }
  };

  const setNewPhono = async (dataPhono ) => {
    try {
      const newphono  ={
        ...dataPhono,
        rut: activeData[0].rut || activeData[0].RUT,
        ruteje:user.rut
      }
      const phono = await (
        await crmApi.post(`/insertar-NewPhono-${allInfo.company}/`, newphono)
      ).data;
      console.log(phono,allInfo.company)
      dispatch(onSetAddPhone(dataPhono["telefono"]));
    } catch (error) {
      console.log(error);
    }
  };

  const setActiveManual = () => {
    try {
      dispatch(onSetActiveWallet());
    } catch (error) {
      console.log(error);
    }
  };

  const setInfoAll = (tp) => {
    try {
      dispatch(onSetAllInfo(tp));
    } catch (error) {
      console.log(error);
    }
  };

  const bacgroundWallet = (path) => {

    console.log('souel backgro',path)
    try {
      dispatch(onPaintWallet(path));
    } catch (error) {
      console.log(error);
    }
  };



  const setChangeTree = (change) => {
    dispatch(onChangeTree(change));
  };

  const setSelectActive = () => {
    dispatch(onSelect());
  };

 

  return {
    clasifications,
    activeData,
    tickets,
    newEmail,
    newPhono,
    activeWallet,
    acsaTicket,
    changeColor,
    setColor,
    allInfo,
    descuento,
    Gestiones,
    active,
    tree,

    setGetData,
    setNewEmail,
    setNewPhono,
    startLoadingClasifications,
    setActiveManual,
    setInfoAll,
    bacgroundWallet,
    insertDataRegister,
    setChangeTree,
    setSelectActive,
    changeTreeManagement

  };
};
