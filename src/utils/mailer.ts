import nodemailer from 'nodemailer'
import { type SentMessageInfo } from 'nodemailer/lib/smtp-transport'

import { getEnvironmentVariable } from './getEnvironmentVariable'

const EXCLUSIVEPASS_MAILER_HOST = getEnvironmentVariable('EXCLUSIVEPASS_MAILER_HOST')
const EXCLUSIVEPASS_MAILER_PASSWORD = getEnvironmentVariable('EXCLUSIVEPASS_MAILER_PASSWORD')
const EXCLUSIVEPASS_MAILER_PORT = parseInt(getEnvironmentVariable('EXCLUSIVEPASS_MAILER_PORT'))
const EXCLUSIVEPASS_MAILER_USER = getEnvironmentVariable('EXCLUSIVEPASS_MAILER_USER')

const transporter = nodemailer.createTransport({
  auth: {
    user: EXCLUSIVEPASS_MAILER_USER,
    pass: EXCLUSIVEPASS_MAILER_PASSWORD
  },
  host: EXCLUSIVEPASS_MAILER_HOST,
  port: EXCLUSIVEPASS_MAILER_PORT,
  secure: true
})

const sendEmail = async (subject: string, text: string, to: string): Promise<SentMessageInfo> => {
  const sentMessageInfo = await transporter.sendMail({
    from: EXCLUSIVEPASS_MAILER_USER,
    subject,
    text,
    to
  })

  return sentMessageInfo
}

export { sendEmail }
