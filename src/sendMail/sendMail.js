import mjml2html from 'mjml'
import nodemailer from 'nodemailer'
import * as yup from 'yup'

import * as dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'QAuth2',
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
})

const testEnev = {
  teate1: process.env.EMAIL,
  teste2: process.env.PASSWORD_EMAIL,
  teste3: process.env.CLIENT_ID,
  teste4: process.env.CLIENT_SECRET,
  teste5: process.env.REFRESH_TOKEN,
}

export const SendEmail = async (request, response) => {
  const schema = yup.object().shape({
    companyName: yup.string().required(),
    productOrService: yup.string().required(),
    companyDescription: yup.string().required(),
    googleSearch: yup.string().required(),
    textCategoryAndService: yup.string().required(),
    privacyPolicy: yup.string().required(),
    serverHosting: yup.string().required(),
    numberOfPagesWebsite: yup.string().required(),
    linksSitesInspiration: yup.string().required(),
    sloganBanner: yup.string().required(),
    photosAndMaterials: yup.string().required(),
    logosAndColors: yup.string().required(),
    ContactPhone: yup.string().required(),
    contactWhatsapp: yup.string().required(),
    emailContact: yup.string().required(),
    linksSocialNetworks: yup.string().required(),
    websiteDomain: yup.string().required(),
    unlistedInformation: yup.string(),
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
    companyName,
    productOrService,
    companyDescription,
    googleSearch,
    textCategoryAndService,
    privacyPolicy,
    serverHosting,
    numberOfPagesWebsite,
    linksSitesInspiration,
    sloganBanner,
    photosAndMaterials,
    logosAndColors,
    ContactPhone,
    contactWhatsapp,
    emailContact,
    linksSocialNetworks,
    websiteDomain,
    unlistedInformation,
  } = request.body

  console.log(testEnev)

  const mjmlCode = `
      <mjml version="3.3.3">
      <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    
        <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="0px 0px 20px 0px" text-align="center" vertical-align="top">
            <mj-column>
                <mj-text>
                    <h2 margin-botton="1rem" class="Title-list">Apresentação de um Novo Projeto Web Site</h2>
                    <h3 margin-botton="3rem" >Nome do Solicitante e Empresa: ${companyName}</h3>
                </mj-text>


                <mj-text>
                    <h2 margin-botton="1rem" class="Title-list">Informações do Projeto:</h2>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Qual o produto ou serviço que sua empresa vende ?</h4>
                        <p>${productOrService}</p>
                    </div>

                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Descrição sobre a empresa</h4>
                        <p>${companyDescription}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Como você pesquisaria a sua empresa no google?</h4>
                        <p>${googleSearch}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Textos instrutivos relacionados as categorias ou tipos de serviços</h4>
                        <p>${textCategoryAndService}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Política de Privacidade. trocas e devoluções</h4>
                        <p>${privacyPolicy}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Você tem um servidor de hopedagem ?</h4>
                        <p>${serverHosting}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem">Quantas páginas e quais o site terá ?</h4>
                        <p>${numberOfPagesWebsite}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Links de 3 sites que você tenha gostado e queira se inspirar</h4>
                        <p>${linksSitesInspiration}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Slogan ou chamada para banner</h4>
                        <p>${sloganBanner}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Fotos e material visual que será usado</h4>
                        <p>${photosAndMaterials}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Você tem padrões existentes, como logos cores, que devem ser incorporados?</h4>
                        <p>${logosAndColors}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Telefones para contato</h4>
                        <p>${ContactPhone}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >E-mail para contato</h4>
                        <p>${emailContact}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Whatsapps para contatos</h4>
                        <p>${contactWhatsapp}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Você registrou um nome de domínio para o seu site ?</h4>
                        <p>${websiteDomain}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Links das redes sociais</h4>
                        <p>${linksSocialNetworks}</p>
                    </div>
                    <div margin-botton="1.5rem">
                        <h4 margin-botton="1rem" >Existe alguma informação não listada aqui que você gostaria de listar ?</h4>
                        <p>${unlistedInformation}</p>
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
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Solicitação de Serviço: ${companyName}`,
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
