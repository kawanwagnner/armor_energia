const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const SMTP_CONFIG = require("./config/smtp");

const app = express();
const port = 3000;

// Use CORS middleware to allow requests from diferentes origens
app.use(cors());

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

// Função de validação
function validateEmailInput(input) {
  const { nome, email, zap, mensagem, economiaPorAno, economiaPorMes, gasto } =
    input;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return "Nome é obrigatório e deve ser uma string válida.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Email é obrigatório e deve ser um email válido.";
  }

  if (!zap || typeof zap !== "string" || zap.trim() === "") {
    return "WhatsApp é obrigatório e deve ser uma string válida.";
  }

  if (!mensagem || typeof mensagem !== "string" || mensagem.trim() === "") {
    return "Mensagem é obrigatória e deve ser uma string válida.";
  }

  if (isNaN(economiaPorAno) || isNaN(economiaPorMes) || !gasto) {
    return "Economia por Ano, Economia por Mês e Gasto devem ser números válidos maiores que zero.";
  }

  return null; // Retorna null se todas as validações passarem
}

// Teste isolado de rota POST
app.post("/test", (req, res) => {
  res.status(200).send("Rota POST /test funcionando!");
});

// Rota para enviar Email
app.post("/send-email", async (req, res) => {
  // Validação do input do cliente
  const validationError = validateEmailInput(req.body);
  if (validationError) {
    return res.status(400).send(validationError); // Retorna o erro de validação
  }

  const { nome, email, zap, mensagem, economiaPorAno, economiaPorMes, gasto } =
    req.body;
  console.log(req.body);

  try {
    const mailOptions = {
      from: `"${nome}" <${email}>`,
      to: "armorenergia.contato@gmail.com",
      subject: `Simulador Utilizado por ${nome}`,
      html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #f9f9f9;">
        <!-- Espaço para a logo -->
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://raw.githubusercontent.com/kawanwagnner/armor_energia/main/img/logo-armor.png" alt="Logo da Empresa" style="max-width: 100px; height: auto;">
        </div>
        <h2 style="text-align: center; color: #0056b3;">Informações para Contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0056b3; text-decoration: none;">${email}</a></p>
        <p><strong>WhatsApp:</strong> ${zap}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
        <h3 style="color: #28a745;">Detalhes Financeiros</h3>
        <p><strong>Gasto Mensal:</strong> R$ ${gasto}</p>
        <p><strong>Economia por Ano (Com desconto de 40%):</strong> <span style="color: #28a745;">R$ ${economiaPorAno}</span></p>
        <p><strong>Economia por Mês (Com desconto de 40%):</strong> <span style="color: #28a745;">R$ ${economiaPorMes}</span></p>
        <p style="text-align: center; margin-top: 50px;">
          <a href="https://kawanwagnner.github.io/Portfolio/" style="background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">[Suporte]</a>
        </p>
      </div>
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
