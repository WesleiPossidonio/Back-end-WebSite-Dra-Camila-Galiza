import mjml2html from 'mjml'
import nodemailer from 'nodemailer'
import * as yup from 'yup'
// import Imap from 'imap'
// import { simpleParser } from 'mailparser'

import * as dotenv from 'dotenv'
dotenv.config()



const senderEmail = process.env.EMAIL;
const senderPassword = process.env.PASSWORD;

const smtpServer = 'smtp.titan.email';
const smtpPort = 587;


const transporter = nodemailer.createTransport({
  host: smtpServer,
  port: smtpPort,
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
})

export const SendEmail = async (request, response) => {
  const schema = yup.object().shape({
      
  })

  const emailOrPasswordIncorrect = () => {
    return response
      .status(400)
      .json({ error: 'Make sure your password or email are correct' })
  }

  if (!(await schema.isValid(request.body))) {
    return emailOrPasswordIncorrect()
  }

  const {
   name, email, phone, service, message
  } = request.body

  const mjmlCode = `
      <mjml version="3.3.3">
      <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    
        <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="0px 0px 20px 0px" text-align="center" vertical-align="top">
            <mj-column>
                <mj-text>
                    <h3 margin-botton="3rem" >Nome do Solicitante ${name}</h3>
                    <h3 margin-botton="3rem" >Email do Solicitante ${email}</h3>
                    <h3 margin-botton="3rem" >Telefone do Solicitante ${phone}</h3>
                </mj-text>

                <mj-text>
                    <h2 margin-botton="1rem" class="Title-list">Informações do Projeto:</h2>
                    <div margin-botton="1.5rem">
                        <h2 margin-botton="1rem" class="Title-list">Dúvida sobre ${service}</h2>
                        <p>${message}</p>
                    </div>
                </mj-text>
            </mj-column>
        </mj-section>
    
        <mj-section background-repeat="repeat" background-size="auto" padding="20px 0px 20px 0px" text-align="center" vertical-align="top">
            <mj-column>
                <mj-text align="center" color="#55575d" font-family="Arial, sans-serif" font-size="11px" line-height="22px" padding="0px 20px"></mj-text>
            </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
      `

  let html
  try {
    const { html: convertedHtml } = mjml2html(mjmlCode)
    html = convertedHtml
  } catch (error) {
    console.error('Erro ao converter o MJML em HTML:', error)
    return response.status(500).json({ error: 'Erro interno do servidor' })
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Solicitação de Serviço: ${service}`,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
  }

  return response.json('email enviado!')
}
