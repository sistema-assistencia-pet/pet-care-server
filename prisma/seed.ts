import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seedStatus (): Promise<void> {
  try {
    await prisma.status.createMany({
      data: [
        { id: 1, name: 'active', translation: 'Ativo' },
        { id: 2, name: 'inactive', translation: 'Inativo' },
        { id: 3, name: 'deleted', translation: 'Excluído' }
      ]
    })
  } catch (error) {
    console.error(error)
  }
}

async function seedRole (): Promise<void> {
  try {
    await prisma.role.createMany({
      data: [
        { id: 1, name: 'member', translation: 'Associado' },
        { id: 2, name: 'master', translation: 'Master' },
        { id: 3, name: 'client_admin', translation: 'Cliente Admin' },
        { id: 4, name: 'partner_admin', translation: 'Estabelecimento Admin' }
      ]
    })
  } catch (error) {
    console.error(error)
  }
}

async function seedCategory (): Promise<void> {
  try {
    await prisma.category.createMany({
      data: [
        { id: 1, name: 'Restaurantes' },
        { id: 2, name: 'Farmácias' },
        { id: 3, name: 'Varejos' }
      ]
    })
  } catch (error) {
    console.error(error)
  }
}

async function seedState (): Promise<void> {
  try {
    await prisma.state.createMany({
      data: [
        { id: 1, name: 'Acre' },
        { id: 2, name: 'Alagoas' },
        { id: 3, name: 'Amapá' },
        { id: 4, name: 'Amazonas' },
        { id: 5, name: 'Bahia' },
        { id: 6, name: 'Ceará' },
        { id: 7, name: 'Distrito Federal' },
        { id: 8, name: 'Espírito Santo' },
        { id: 9, name: 'Goiás' },
        { id: 10, name: 'Maranhão' },
        { id: 11, name: 'Mato Grosso' },
        { id: 12, name: 'Mato Grosso do Sul' },
        { id: 13, name: 'Minas Gerais' },
        { id: 14, name: 'Pará' },
        { id: 15, name: 'Paraíba' },
        { id: 16, name: 'Paraná' },
        { id: 17, name: 'Pernambuco' },
        { id: 18, name: 'Piauí' },
        { id: 19, name: 'Rio de Janeiro' },
        { id: 20, name: 'Rio Grande do Norte' },
        { id: 21, name: 'Rio Grande do Sul' },
        { id: 22, name: 'Rondônia' },
        { id: 23, name: 'Roraima' },
        { id: 24, name: 'Santa Catarina' },
        { id: 25, name: 'São Paulo' },
        { id: 26, name: 'Sergipe' },
        { id: 27, name: 'Tocantins' }
      ]
    })
  } catch (error) {
    console.error(error)
  }
}

async function seedCity (): Promise<void> {
  try {
    await prisma.city.createMany({
      data: [
        { id: 1, name: 'Rio Branco', stateId: 1 },
        { id: 2, name: 'Maceió', stateId: 2 },
        { id: 3, name: 'Macapá', stateId: 3 },
        { id: 4, name: 'Manaus', stateId: 4 },
        { id: 5, name: 'Salvador', stateId: 5 },
        { id: 6, name: 'Fortaleza', stateId: 6 },
        { id: 7, name: 'Brasília', stateId: 7 },
        { id: 8, name: 'Vitória', stateId: 8 },
        { id: 9, name: 'Goiânia', stateId: 9 },
        { id: 10, name: 'São Luís', stateId: 10 },
        { id: 11, name: 'Cuiabá', stateId: 11 },
        { id: 12, name: 'Campo Grande', stateId: 12 },
        { id: 13, name: 'Belo Horizonte', stateId: 13 },
        { id: 14, name: 'Belém', stateId: 14 },
        { id: 15, name: 'João Pessoa', stateId: 15 },
        { id: 16, name: 'Curitiba', stateId: 16 },
        { id: 17, name: 'Recife', stateId: 17 },
        { id: 18, name: 'Teresina', stateId: 18 },
        { id: 19, name: 'Rio de Janeiro', stateId: 19 },
        { id: 20, name: 'Natal', stateId: 20 },
        { id: 21, name: 'Porto Alegre', stateId: 21 },
        { id: 22, name: 'Porto Velho', stateId: 22 },
        { id: 23, name: 'Boa Vista', stateId: 23 },
        { id: 24, name: 'Florianópolis', stateId: 24 },
        { id: 25, name: 'São Paulo', stateId: 25 },
        { id: 26, name: 'Aracaju', stateId: 26 },
        { id: 27, name: 'Palmas', stateId: 27 }
      ]
    })
  } catch (error) {
    console.error(error)
  }
}

async function main (): Promise<void> {
  console.log('Populating database...')
  await seedStatus()
  await seedRole()
  await seedCategory()
  await seedState()
  await seedCity()
  console.log('Database populated!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
