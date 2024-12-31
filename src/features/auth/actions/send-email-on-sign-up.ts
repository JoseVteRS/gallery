import { resend } from '@/lib/email';


const sendEmailOnSignUp = async (userEmail: string) => {
  // Contenido del correo electrónico
  const emailData = {
    from: 'tuemail@ejemplo.com',
    to: userEmail,
    subject: 'Bienvenido a nuestra plataforma',
    text: 'Gracias por registrarte en nuestra plataforma. ¡Esperamos que disfrutes de nuestros servicios!',
  };

  // Enviar el correo electrónico
  try {
    await resend.emails.send(emailData);
    console.log('Correo electrónico enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

export default sendEmailOnSignUp;

