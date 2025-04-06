import nodemailer from 'nodemailer'
import { type SentMessageInfo } from 'nodemailer/lib/smtp-transport'

import { getEnvironmentVariable } from './getEnvironmentVariable'

const PET_CARE_MAILER_HOST = getEnvironmentVariable('PET_CARE_MAILER_HOST')
const PET_CARE_MAILER_PASSWORD = getEnvironmentVariable('PET_CARE_MAILER_PASSWORD')
const PET_CARE_MAILER_PORT = parseInt(getEnvironmentVariable('PET_CARE_MAILER_PORT'))
const PET_CARE_MAILER_USER = getEnvironmentVariable('PET_CARE_MAILER_USER')

const transporter = nodemailer.createTransport({
  auth: {
    user: PET_CARE_MAILER_USER,
    pass: PET_CARE_MAILER_PASSWORD
  },
  host: PET_CARE_MAILER_HOST,
  port: PET_CARE_MAILER_PORT,
  secure: true
})

const sendEmail = async (subject: string, text: string, to: string): Promise<SentMessageInfo> => {
  const sentMessageInfo = await transporter.sendMail({
    from: PET_CARE_MAILER_USER,
    subject,
    text,
    to
  })

  return sentMessageInfo
}

export { sendEmail }
