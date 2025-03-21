import 'dotenv/config'
import nodemailer from 'nodemailer'

import { EMAIL_USER, EMAIL_PASSWORD, ADMIN_EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE } from '../config.js'
import { EmailTemplates } from './emailTemplates.js'

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
})

export async function sendActivationEmail ({ token, userData }) {
  const emailOptions = {
    from: {
      name: 'Colmado Cesar App',
      address: EMAIL_USER
    },
    to: ADMIN_EMAIL,
    subject: '🔔 Nueva solicitud de activación de cuenta',
    html: EmailTemplates.activateAccount({ userData, token })
  }
  const info = await transporter.sendMail(emailOptions)
  return info
}

export async function sendActivationResponseEmail ({ email, username, isApproved }) {
  const emailOptions = {
    from: {
      name: 'Colmado Cesar App',
      address: EMAIL_USER
    },
    to: email,
    subject: '🔔 Respuesta solicitud de activación cuenta',
    html: isApproved ? EmailTemplates.approvedAccount({ username }) : EmailTemplates.rejectedAccount({ username })
  }

  const info = await transporter.sendMail(emailOptions)
  return info
}
