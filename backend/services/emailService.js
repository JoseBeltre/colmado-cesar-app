import 'dotenv/config'
import nodemailer from 'nodemailer'

import { EMAIL_USER, EMAIL_PASSWORD, ADMIN_EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE } from '../config.js'

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
})

export async function sendActivationEmail ({ token, userData, approvedUrl, deniedUrl }) {
  const { name, email, phoneNumber, createdAt, role, username } = userData
  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES')

  const emailOptions = {
    from: {
      name: 'Colmado Cesar App',
      address: EMAIL_USER
    },
    to: ADMIN_EMAIL,
    subject: '🔔 Nueva solicitud de activación de cuenta',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; color: #007BFF;">🚀 Nueva Solicitud de Activación</h2>
      <p>Hola <strong>Administrador</strong>,</p>
      <p>Un nuevo usuario ha solicitado la activación de su cuenta. Aquí están los detalles:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Nombre:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Usuario:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${username}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Email:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Teléfono:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${phoneNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Fecha de Registro:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>Rol Solicitado:</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${role}</td>
        </tr>
      </table>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${approvedUrl}?token=${token}" 
          style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color:rgb(74, 195, 102); text-decoration: none; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-right: 10px;">
          ✅ Activar Cuenta
        </a>

        <a href="${deniedUrl}?token=${token}" 
          style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color:#df6471; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          ❌ Rechazar Cuenta
        </a>
      </p>

      <p style="text-align: center; color: #888; font-size: 14px;">Colmado Cesar &copy; 2025</p>
    </div>
    `
  }

  try {
    const info = await transporter.sendMail(emailOptions)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error(error)
  }
}
