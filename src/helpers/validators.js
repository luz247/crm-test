
import * as Yup from 'yup';

export const collectPhoneNumbers = (data) => {
    const fields = ['fono1','fono2', 'Fono', 'movil1', 'movil2', 'movil3', 'fijo1', 'fijo2', 'fijo3','Celular'];
    const uniquePhones = new Set(); // Crea un Set para almacenar números únicos
  
    fields.forEach(field => {
      if (data[field]) {
        uniquePhones.add(data[field]); // Añade el número al Set, asegurándote de quitar espacios
      }
    });
  
    // Convertir el Set a un array de elementos React
    return uniquePhones
  };




  export const validationSchema = Yup.object().shape({
    telefono: Yup.string().required('Fono Gestión es obligatorio'),
    glosa: Yup.string().required('Glosa es obligatorio'),
    selectedStatus: Yup.string().required('Debe seleccionar un estado').nullable(),
  });
  
  export const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email es obligatorio'),
  });
  
  export const phoneValidationSchema = Yup.object().shape({
    telefono: Yup.string()
      .matches(/^\d{9}$/, 'Teléfono inválido, debe tener 9 dígitos')
      .required('Teléfono es obligatorio'),
  });
  