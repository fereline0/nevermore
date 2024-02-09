import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

const role = prisma.role.upsert({
    where: {
        name: "User",
    },
    update: {},
    create: { name: "User", color: "ffffaa" },
})

console.log(role)

}

main()

.then(async () => {

    await prisma.$disconnect()

})

.catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

})