const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const SMTP_CONFIG = require("./config/smtp");

const app = express();
const port = 3000;

// Configuração do middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configuração do transporte do nodemailer
const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: SMTP_CONFIG.port === 465, // Use true para porta 465 (SMTP seguro)
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false, // Permite conexões não autorizadas (útil para testar)
  },
});

// Teste isolado de rota POST
app.post("/test", (req, res) => {
  res.status(200).send("Rota POST /test funcionando!");
});

// Rota para enviar Email
app.post("/send-email", async (req, res) => {
  const { nome, email, zap, mensagem, economiaPorAno, economiaPorMes } =
    req.body;

  try {
    const mailOptions = {
      from: `"${nome}" <${email}>`,
      to: "armorenergia.contato@gmail.com",
      subject: zap,
      html: `
        <html>
        <body>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${zap}</p>
          <p><strong>Mensagem:</strong> ${mensagem}</p>
          <p><strong>Economia por Ano (Com desconto de 40%):</strong> R$ ${economiaPorAno}</p>
          <p><strong>Economia por Mês (Com desconto de 40%):</strong> R$ ${economiaPorMes}</p>
        </body>
        </html>
      `,
    };

    // Envia o email e captura as informações de envio
    const mailSent = await transporter.sendMail(mailOptions);

    // Loga informações detalhadas sobre o envio
    console.log("Email enviado com sucesso:", mailSent);

    if (mailSent.accepted.length > 0) {
      console.log("Destinatários que aceitaram o email:", mailSent.accepted);
    } else {
      console.log("Nenhum destinatário aceitou o email.");
    }

    // Envia uma resposta ao cliente com informações do envio
    res
      .status(200)
      .send(`Email enviado com sucesso para: ${mailSent.accepted.join(", ")}`);
  } catch (error) {
    console.error("Erro ao enviar o Email:", error);
    res.status(500).send(`Erro ao enviar o Email: ${error.message}`);
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
