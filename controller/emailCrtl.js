const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')
const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: 'trancongtien406@gmail.com', // Your email address
      pass: 'bictxdceulhtrlyo', // Password (for gmail, your app password)
    },
  })

  let info = await transporter.sendMail({
    from: '"Fred Bro 👻" <trancongtien406@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  })

  console.log(info.messageId) // Random ID generated after successful send (optional)
})

module.exports = sendEmail
