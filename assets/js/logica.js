// Obtener referencias a los elementos del HTML
const btnEnviar = document.getElementById('enviar');
const btnAgregarCC = document.getElementById('agregar-cc');
const contenidoCC = document.getElementById('contenido-cc');

// Evento para agregar un nuevo campo de CC
btnAgregarCC.addEventListener('click', function() {
  const nuevoCC = document.createElement('input');
  nuevoCC.type = 'email';
  nuevoCC.className = 'email-cc';
  nuevoCC.placeholder = 'Añadir CC';
  contenidoCC.appendChild(nuevoCC);
});

// Evento para enviar el correo y mostrar los datos en un popup
btnEnviar.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar recargar la página

  // Capturar los valores ingresados en los campos
  const destinatario = document.getElementById('destinatario').value.trim();
  const asunto = document.getElementById('asunto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const remitente = document.getElementById('remitente').value.trim();

  // Capturar todos los correos CC como un array
  const entradasCC = document.querySelectorAll('.email-cc');
  const emailsCC = [];
  for (const input of entradasCC) {
    const email = input.value.trim();
    if (email) {
      emailsCC.push(email);
    }
  }

  // Validar que los campos requeridos no estén vacíos
  if (!destinatario || !remitente || !asunto) {
    alert('Por favor, completa los campos PARA, DE y TITULO.');
    return;
  }

  // Función usando Rest Parameter para mostrar los correos CC
  function mostrarCorreosCC(...emails) {
    let listaCC = '';
    for (const email of emails) {
      listaCC += `CC: ${email}\n`;
    }
    return listaCC;
  }

  // Construir el mensaje con los datos del formulario
  const detallesEmail = `
    PARA: ${destinatario}
    TITULO: ${asunto}
    MENSAJE: ${mensaje}
    DE: ${remitente}
    ${emailsCC.length > 0 ? mostrarCorreosCC(...emailsCC) : 'No se añadieron CC.'}
  `;

  // Mostrar los detalles en un popup
  alert(detallesEmail);
});
