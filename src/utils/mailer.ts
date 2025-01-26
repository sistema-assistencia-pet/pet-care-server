import nodemailer from 'nodemailer'
import { type SentMessageInfo } from 'nodemailer/lib/smtp-transport'

import { getEnvironmentVariable } from './getEnvironmentVariable'

const GIFT2ME_MAILER_HOST = getEnvironmentVariable('GIFT2ME_MAILER_HOST')
const GIFT2ME_MAILER_PASSWORD = getEnvironmentVariable('GIFT2ME_MAILER_PASSWORD')
const GIFT2ME_MAILER_PORT = parseInt(getEnvironmentVariable('GIFT2ME_MAILER_PORT'))
const GIFT2ME_MAILER_USER = getEnvironmentVariable('GIFT2ME_MAILER_USER')

const transporter = nodemailer.createTransport({
  auth: {
    user: GIFT2ME_MAILER_USER,
    pass: GIFT2ME_MAILER_PASSWORD
  },
  host: GIFT2ME_MAILER_HOST,
  port: GIFT2ME_MAILER_PORT,
  secure: true
})

const sendEmail = async (subject: string, text: string, to: string): Promise<SentMessageInfo> => {
  const sentMessageInfo = await transporter.sendMail({
    from: GIFT2ME_MAILER_USER,
    subject,
    text,
    to
  })

  return sentMessageInfo
}

export { sendEmail }
