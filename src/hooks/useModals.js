import { useState } from 'react';


export function useModalWithInput(initialValue , onSave) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(initialValue);

  const showModal = () => setIsVisible(true);
  const handleOk = () => {
    setIsVisible(false);
    onSave(value);  // Enviar todos los datos
  };
  const handleCancel = () => setIsVisible(false);
  const handleChange = (e, key = 'data') => {
    setValue(prev => ({...prev, [key]: e.target.value}));
  };

  return {
    isVisible,
    value,
    showModal,
    handleOk,
    handleCancel,
    handleChange,
    setValue
  };
}


