import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prismaClient = new PrismaClient()

export default prismaClient
