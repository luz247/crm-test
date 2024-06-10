import { useEffect, useState } from "react";
import moment from 'moment-timezone';

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onDateChange = (date, dateString, name) => {
    const formattedDate = date ? moment.tz(date, 'America/Santiago').format('YYYY-MM-DD') : '';
    setFormState({
      ...formState,
      [name]: formattedDate,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onDateChange,
    onResetForm,
  };
};
