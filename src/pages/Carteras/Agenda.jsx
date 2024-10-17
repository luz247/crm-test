import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/es';
import { Modal, DatePicker, Button } from 'antd';
import { useCrmStore } from '../../hooks/useCrmStore';
import { makeCall } from '../../helpers/getCall';
import { useAuthStore } from '../../hooks/useAuthStore';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de importar los estilos de Bootstrap Icons
import '../../assets/css/Agenda.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Quill from 'quill';
import 'quill-paste-smart';
import 'quill/dist/quill.snow.css';



const MySwal = withReactContent(Swal);

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

export const Agenda = () => {
  const { diary, setColor, SendSms, EnviarEmail } = useCrmStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToReschedule, setEventToReschedule] = useState(null);
  const { user } = useAuthStore();

  // Actualizar currentDate cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000); // 30 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const openModal = (event) => {
    setEventToReschedule(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventToReschedule(null);
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReschedule = () => {
    // Aquí puedes añadir la lógica para guardar la nueva fecha del evento
    console.log('Nueva fecha para el evento:', eventToReschedule, selectedDate);
    closeModal();
  };

  const events = useMemo(() => {
    return diary.map(event => ({
      ...event,  // Incluir todas las propiedades del evento original
      title: event.Estado,
      start: new Date(event.Fecha_Agenda),
      end: new Date(event.Fecha_Agenda),
    }));
  }, [diary]);

  const eventStyleGetter = (event) => {
    const isFuture = new Date(event.Fecha_Agenda) >= currentDate;
    const textColor = isFuture ? 'green' : 'red';

    const style = {
      borderRadius: '8px',
      backgroundColor: '#f6f6f6',
      color: textColor,
      border: '1px solid #ddd',
      padding: '10px',
      margin: '5px 0',  // Asegura que los eventos tengan un margen vertical uniforme
      width: '100%',    // Asegura que el evento ocupe toda la columna
      boxSizing: 'border-box',
    };
    return {
      style: style
    };
  };


  const calls = async (telefono) => {
    console.log(telefono, user.rut, 'call me');
    try {
      await makeCall({ user: user.rut, phono: telefono });
    } catch (error) {
      console.error("Error en la llamada:", error);
      Swal.fire("Ocurrió un error al hacer la llamada. Por favor, intente de nuevo.");
    }
  };

  const sendEmail = (defaultEmail) => {
    MySwal.fire({
      title: 'Enviar Correo',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Correo Electrónico" value="${defaultEmail || ''}" />
        <input id="swal-input2" class="swal2-input" placeholder="Asunto" />
        <div id="editor-container" style="height: 200px;"></div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      didOpen: () => {
        const quill = new Quill('#editor-container', {
          theme: 'snow',
          placeholder: 'Escribe tu mensaje aquí...',
          modules: {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ]
          }
        });
      },
      preConfirm: () => {
        const email = document.getElementById('swal-input1').value;
        const subject = document.getElementById('swal-input2').value;
        const body = document.querySelector('.ql-editor').innerHTML;

        if (!email || !subject || !body) {
          Swal.showValidationMessage('Debes completar todos los campos');
          return false;
        }

        return { email, subject, body };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { email, subject, body } = result.value;


        const response = await EnviarEmail(email, subject, body);

        if (response.success) {
          Swal.fire('Enviado', 'El correo ha sido enviado correctamente', 'success');
        } else {
          Swal.fire('Error', 'Hubo un error al enviar el correo', 'error');
        }
      }
    });
  };



  const sendSMS = (defaultPhone) => {
    MySwal.fire({
      title: 'Enviar SMS',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Teléfono" value="${defaultPhone}" />
        <textarea id="swal-input2" class="swal2-textarea" placeholder="Escribe tu mensaje aquí"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      preConfirm: () => {
        const phone = document.getElementById('swal-input1').value;
        const message = document.getElementById('swal-input2').value;

        if (!phone || !message) {
          Swal.showValidationMessage('Debes completar ambos campos');
          return false;
        }

        return { phone, message };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { phone, message } = result.value;

        // Llamada a la función SendSMS con los parámetros
        const sms = SendSms(phone, message);

        console.log(sms, 'sjsj')

        Swal.fire('¡Enviado!', 'Tu SMS ha sido enviado correctamente.', 'success');
      }
    });
  };



  const renderAgendaEvent = ({ event }) => {
    const isFuture = new Date(event.Fecha_Agenda) >= currentDate;
    const textColor = isFuture ? 'green' : 'red';

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: textColor,
        backgroundColor: '#f6f6f6',
        borderRadius: '8px',
        padding: '10px',
        width: '100%',  // Asegura que el evento ocupe toda la columna
        boxSizing: 'border-box'
      }}>
        <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
          <strong style={{ fontSize: '18px' }}>Rut: {event.RUT || Event.Rut || event.rut}</strong>
          <br />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <span style={{ marginRight: '10px' }}>Teléfono: {event.telefono}</span>
            <i
              className="bi bi-telephone"
              onClick={() => calls(event.telefono)}
              style={{ color: textColor, cursor: 'pointer', fontSize: '24px', marginRight: '10px' }}
            ></i>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                marginRight: '10px'
              }}
              onClick={() => sendSMS(event.telefono)} // Llamar a la función sendSMS
            >
              <i className="bi bi-chat-square-dots" style={{ color: textColor, fontSize: '24px' }}></i>
            </div>
            <i
              className="bi bi-envelope"
              onClick={() => sendEmail(event.email)}
              style={{ color: textColor, cursor: 'pointer', fontSize: '24px', marginLeft: '10px' }}
            ></i>
          </div>
          <br />
          <span>Fecha : {dayjs(event.Fecha_Agenda).format('YYYY-MM-DD')}</span>
        </span>
      </div>
    );
  };



  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        messages={{
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          allDay: 'Todo el día',
          week: 'Semana',
          work_week: 'Semana laboral',
          day: 'Día',
          month: 'Mes',
          previous: 'Atrás',
          next: 'Siguiente',
          yesterday: 'Ayer',
          tomorrow: 'Mañana',
          today: 'Hoy',
          agenda: 'Agenda',
          noEventsInRange: 'No hay eventos en este rango.',
          showMore: total => `+ Ver más (${total})`
        }}
        components={{
          agenda: {
            event: renderAgendaEvent,
          }
        }}
        className="custom-agenda"
      />

      <Modal
        title="Reagendar Evento"
        open={modalIsOpen}
        onCancel={closeModal}
        onOk={handleReschedule}
      >
        <DatePicker
          onChange={handleDateChange}
          value={selectedDate}
          format="YYYY-MM-DD"
        />
      </Modal>
    </>
  );
};
