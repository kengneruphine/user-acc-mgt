import nodemailer from 'nodemailer'
import env from '../env.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user:env.domain_email,
            pass:env.domain_password
        }
})

export default transporter;
