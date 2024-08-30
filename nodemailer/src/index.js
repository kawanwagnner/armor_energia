// const nodemailer = require("nodemailer");

// const SMTP_CONFIG = require("./config/smtp");

// const transporter = nodemailer.createTransport({
//   host: SMTP_CONFIG.host,
//   port: SMTP_CONFIG.port,
//   secure: false, // Usar 'true' para porta 465, 'false' para outras portas
//   auth: {
//     user: SMTP_CONFIG.user,
//     pass: SMTP_CONFIG.pass,
//   },
//   tls: {
//     rejectUnauthorized: false, // Permite conexões não autorizadas (útil para testar)
//   },
// });

// async function run() {
//   const mailSent = await transporter.sendMail({
//     text: "Texto do E-mail", // Texto do corpo do e-mail (sem formatação)
//     subject: "Assunto do e-mail", // Assunto do e-mail
//     from: "Victor Moraes <armorenergia.contato@gmail.com>", // Corrigido o fechamento do campo 'from'
//     to: ["armorenergia.contato@gmail.com"], // Lista de destinatários
//     html: `
//     <html>
//     <body>
//       <strong>Conteúdo HTML</strong></br>Do E-mail
//     </body>
//   </html>
//     `, // Corpo do e-mail em HTML
//   });

//   console.log(mailSent); // Exibe a resposta do envio no console
// }

// run();

// Acaba aqui...

// const nodemailer = require("nodemailer");

// const SMTP_CONFIG = require("./config/smtp");

// const transporter = nodemailer.createTransport({
//   host: SMTP_CONFIG.host,
//   port: SMTP_CONFIG.port,
//   secure: false,
//   auth: {
//     user: SMTP_CONFIG.user,
//     pass: SMTP_CONFIG.pass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// document
//   .getElementById("contactForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Previne a atualização da página

//     const nome = document.getElementById("nome").value;
//     const email = document.getElementById("email").value;
//     const whatsapp = document.getElementById("whatsapp").value;

//     const messageBody = `
//     <html>
//     <body>
//       <p><strong>Nome:</strong> ${nome}</p>
//       <p><strong>E-mail:</strong> ${email}</p>
//       <p><strong>WhatsApp:</strong> ${whatsapp}</p>
//     </body>
//     </html>
//   `;

//     try {
//       const mailSent = await transporter.sendMail({
//         text: `Nome: ${nome}\nE-mail: ${email}\nWhatsApp: ${whatsapp}`,
//         subject: "Simulação Completa",
//         from: `${nome} <${email}>`,
//         to: ["armorenergia.contato@gmail.com"],
//         html: messageBody,
//       });

//       console.log(mailSent);
//       document.getElementById("resultMessage").innerText =
//         "E-mail enviado com sucesso!";
//     } catch (error) {
//       console.error(error);
//       document.getElementById("resultMessage").innerText =
//         "Erro ao enviar o e-mail.";
//     }
//   });
