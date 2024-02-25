import nodemailer from 'nodemailer'
import { type SentMessageInfo } from 'nodemailer/lib/smtp-transport'

import { getEnvironmentVariable } from './getEnvironmentVariable'

const MAILER_HOST = getEnvironmentVariable('MAILER_HOST')
const MAILER_PASSWORD = getEnvironmentVariable('MAILER_PASSWORD')
const MAILER_PORT = parseInt(getEnvironmentVariable('MAILER_PORT'))
const MAILER_SERVICE = getEnvironmentVariable('MAILER_SERVICE')
const MAILER_USER = getEnvironmentVariable('MAILER_USER')

const transporter = nodemailer.createTransport({
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASSWORD
  },
  host: MAILER_HOST,
  port: MAILER_PORT,
  service: MAILER_SERVICE
})

const sendEmail = async (subject: string, text: string, to: string): Promise<SentMessageInfo> => {
  const sentMessageInfo = await transporter.sendMail({
    from: MAILER_USER,
    subject,
    text,
    to
  })

  return sentMessageInfo
}

export { sendEmail }
