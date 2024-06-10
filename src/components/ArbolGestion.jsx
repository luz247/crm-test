import React, { useEffect, useState } from "react";
import { Select, Card } from "antd";
import "../assets/css/index.css";
import { useCrmStore } from "../hooks/useCrmStore";

const { Option } = Select;

export const ArbolGestion = ({ setSelectedStatus, resetFlag, setResetFlag }) => {
  const { clasifications, setChangeTree, setSelectActive } = useCrmStore();
  const [managementOptions, setManagementOptions] = useState(new Map());
  const [selectedManagement, setSelectedManagement] = useState('');
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [selectedStatus, setSelectedStatusLocal] = useState('');

  useEffect(() => {
    const optionsMap = new Map();
    clasifications.forEach(item => {
      if (item.glosa_gestion && item.glosa_estado) {
        const valueToStore = {
          estado: item.glosa_estado,
          idRespuestaStatus: item.idrespuesta + '_' + item.status
        };

        if (!optionsMap.has(item.glosa_gestion)) {
          optionsMap.set(item.glosa_gestion, []);
        }
        if (!optionsMap.get(item.glosa_gestion).some(e => e.estado === item.glosa_estado)) {
          optionsMap.get(item.glosa_gestion).push(valueToStore);
        }
      }
    });

    setManagementOptions(optionsMap);
  }, [clasifications]);

  useEffect(() => {
    if (resetFlag) {
      setSelectedManagement('');
      setSecondSelectOptions([]);
      setSelectedStatusLocal('');
      setSelectedStatus('');
      setResetFlag(false); // Reset the flag
    }
  }, [resetFlag, setSelectedStatus, setResetFlag]);

  const handleManagementChange = value => {
    setSelectedManagement(value);
    setSecondSelectOptions(managementOptions.get(value) || []);
    setSelectedStatusLocal(''); // Limpia la selección del segundo combobox
    setSelectedStatus(''); // Limpia el estado seleccionado en el componente padre
  };

  const handleSecondSelectChange = value => {
    setSelectedStatusLocal(value);
    setSelectedStatus(value); // Actualiza el estado en el componente padre
    if (value) {
      setChangeTree(value); // Llama a la función para cambiar el estado del árbol con el idRespuestaStatus seleccionado
    }
  };

  return (
    <>
      <Card title="Datos de Gestión" bordered={false} style={{ width: "100%", textAlign: "center" }}>
        <Select
          style={{ width: "100%" }}
          value={selectedManagement}
          onChange={handleManagementChange}
          placeholder="Seleccionar Gestión"
        >
          <Option value="" disabled>Seleccione...</Option>
          {Array.from(managementOptions.keys()).map(key => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>

        {selectedManagement && (
          <Select
            style={{ width: "100%", marginTop: 20 }}
            placeholder="Seleccionar Estado"
            value={selectedStatus} // Asigna el valor del estado seleccionado
            onChange={handleSecondSelectChange} // Añade el manejador aquí
          >
            <Option value="" disabled>Seleccione...</Option>
            {secondSelectOptions.map(option => (
              <Option key={option.idRespuestaStatus} value={option.idRespuestaStatus}>
                {option.estado}
              </Option>
            ))}
          </Select>
        )}
      </Card>
    </>
  );
};
