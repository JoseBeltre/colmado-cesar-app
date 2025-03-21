import { WEB_URL } from '../config.js'

export const EmailTemplates = {
  activateAccount: ({ userData, token }) => {
    const { name, email, phoneNumber, createdAt, role, username } = userData
    const formattedDate = new Date(createdAt).toLocaleDateString('es-ES')

    return `
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
        <a href="${WEB_URL}/auth/activate?token=${token}" 
          style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color:rgb(74, 195, 102); text-decoration: none; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-right: 10px;">
          ✅ Activar Cuenta
        </a>

        <a href="${WEB_URL}/auth/deny?token=${token}" 
          style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color:#df6471; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          ❌ Rechazar Cuenta
        </a>
      </p>

      <p style="text-align: center; color: #888; font-size: 14px;">Colmado Cesar &copy; 2025</p>
    </div>
    `
  },
  approvedAccount: ({ username }) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #007BFF;">🚀 ¡Tu cuenta ha sido activada!</h2>
        <p>Hola <strong>${username}</strong>,</p>
        <p>Nos complace informarte que tu cuenta ha sido activada con éxito. Ahora puedes acceder a nuestra plataforma, bienvenido/a 🤗.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${WEB_URL}/auth/login" 
            style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            🔑 Iniciar sesión
          </a>
        </p>
        <p style="text-align: center; color: #888; font-size: 14px;">Colmado César &copy; 2025</p>
      </div>
    `
  },
  rejectedAccount: ({ username }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; color: #DC3545;">❌ Tu solicitud de cuenta ha sido rechazada</h2>
      <p>Hola <strong>${username}</strong>,</p>
      <p>Lamentamos informarte que tu solicitud de activación de cuenta ha sido rechazada.</p>
      <p style="text-align: center; color: #888; font-size: 14px;">Colmado César &copy; 2025</p>
    </div>
  `
  }
}
