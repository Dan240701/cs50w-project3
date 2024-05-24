document.addEventListener('DOMContentLoaded', function () {

  // Use buttons para desplegar a traves de las views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  //enviar email
  document.querySelector('#compose-form').addEventListener('submit', enviar_email);

  //Styles a mi textArea de Compose
  document.querySelector('#compose-body').style.height = "171px";


  // By default, load the inbox
  load_mailbox('inbox');
});

//Funcion para mostrar u ocultar vistas
function toggle_view(view_selector, show) {
  const view = document.querySelector(view_selector);
  if (show) {
    view.classList.add('visible');
    view.classList.remove('hidden');
  } else {
    view.classList.add('hidden');
    view.classList.remove('visible');
  }
}


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function ver_email(id) {
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#emails-view').style.display = 'block';
      document.querySelector('#emails-view').innerHTML = `
    <div class="card">
          <div class="card-header">
              <h4 class="mb-2">De:  ${email.sender}</h4>
              <h6 class="text-capitalize">Para: ${email.recipients}</h6>
          </div>
          <div class="card-body">
              <h1 class="card-title">Asunto: ${email.subject}</h1>
              <p class="card-text">${email.body}</p>
              <div class="text-dark mb-2"><strong>Fecha y hora: ${email.timestamp} </strong></div>
          </div>
      </div> 
      <div class="buton-section">

          <button class="btn btn-outline-primary" id="responder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z"/>
          </svg>
          Responder</button>
          <button class="btn btn-outline-success" id="desarchivar" style="display: ${email.archived ? 'inline-block' : 'none'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
             <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
          </svg>
          Desarchivar</button>
          <button class="btn btn-outline-danger" id="archivar" style="display: ${email.archived ? 'none' : 'inline-block'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
          </svg>
          Archivar</button>
      </div>
    `;

      //Una vez el correo haya sido clickeado, debes actualizar el correo cómo leído.
      if (!email.read) {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            read: true
          })
          
        })
      }

      //Evento de archivar email
      document.querySelector('#archivar').addEventListener('click', () => {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: true
          })
        })
        load_mailbox('archive');
      })

      //Evento de desarchivar email
      document.querySelector('#desarchivar').addEventListener('click', () => {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: false
          })
        })
        load_mailbox('inbox');
      })

      //Boton de responder email
      document.querySelector('#responder').addEventListener('click', () => {
        compose_email();
        document.querySelector('#compose-recipients').value = email.sender;
        if (email.subject.indexOf("Re: ") === -1) {
          email.subject = "Re: " + email.subject;
        }
        document.querySelector('#compose-subject').value = email.subject;
        document.querySelector('#compose-body').value = `
        ---------- Forwarded message ---------
        De: ${email.sender}
        Fecha: ${email.timestamp}
        Mensaje:
        ${email.body}
        ----------------------------------------
        `;
      })

    });
}


function load_mailbox(mailbox) {

  // Mostrar el Mailbox y ocultar el bloque de Composicion
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // MOSTRAR EL NOMBRE DEL MAILBOX SELECCIONADO
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //Mostrar Emails segun mi Mailbox
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      emails.forEach(mail => {
        //Print emails
        console.log(mail);
        const email = document.createElement('div');
        let EstadoLeido = mail.read ? 'read' : 'unread';
        email.className = 'email_view';
        email.innerHTML = `
        <div class="card mb-6 mt-6 ${EstadoLeido}">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <h5 class="card-title">${mail.sender}</h5>
                    </div>
                    <div class="col-md-6">
                        <p class="card-text">${mail.subject}</p>
                    </div>
                    <div class="col-md-3 text-md-right">
                        <small class="text-muted">${mail.timestamp}</small>
                    </div>
                </div>
            </div>
        </div>
    `;

       // (Testear estados)
        console.log(`Email ${mail.id} is read: ${mail.read}`); 
        console.log(`Email ${mail.id} class: ${email.className}`); 

        //Ver el detalle de los correos
        email.addEventListener('click', () => {ver_email(mail.id);})
        document.querySelector('#emails-view').append(email);

      });
    });



}

//funcion utilizada para enviar email
function enviar_email(event) {
  event.preventDefault();
  const submitButton = document.querySelector('#compose-form input[type="submit"]');
  submitButton.disabled = true;
  submitButton.value = 'Enviando...';

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      submitButton.disabled = false;
      submitButton.value = 'Enviar';
      load_mailbox('sent');
    })
    .catch(e => {
      console.error('Error:', e);
      submitButton.disabled = false;
      submitButton.value = 'Enviar';
    });
}

