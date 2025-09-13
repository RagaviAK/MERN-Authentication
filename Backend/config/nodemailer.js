import nodemailer from 'nodemailer';

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    auth:{
        user:process.env.SENDER_EMAIL,
        pass: process.env.SMTP_PASS
    }
})
export default transporter;