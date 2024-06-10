export const formatCurrency = (value) => {
    // Verificar si el valor es nulo o indefinido y usar 0 como valor predeterminado
    if (value === null || value === undefined) {
      value = 0;
    }

    // Convertir el valor a número para asegurar compatibilidad con toLocaleString
    const numericValue = parseFloat(value);

    // Usar toLocaleString para formatear el valor como moneda
    return numericValue.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
  };