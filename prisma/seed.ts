import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const abilities = await prisma.ability.createMany({
    data: [
      { slug: "deleteUser" },
      { slug: "deleteUserComment" },
      { slug: "superviseForum" },
      { slug: "editUser" },
      { slug: "editUserRole" },
      { slug: "ban" },
    ],
    skipDuplicates: true,
  });

  const user = await prisma.role.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: "User",
      color: "#a3a3a3",
    },
  });

  const moderator = await prisma.role.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      name: "Moderator",
      color: "#60bd53",
      abilities: {
        connect: [{ slug: "deleteUserComment" }, { slug: "editUser" }],
      },
    },
  });

  const admin = await prisma.role.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      name: "Admin",
      color: "#ff0000",
      abilities: {
        connect: [
          { slug: "deleteUserComment" },
          { slug: "superviseForum" },
          { slug: "editUser" },
          { slug: "editUserRole" },
          { slug: "ban" },
        ],
      },
    },
  });

  const developer = await prisma.role.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      name: "Developer",
      color: "linear-gradient(to right, #d77bff, #8796ff)",
      abilities: {
        connect: [
          { slug: "deleteUserComment" },
          { slug: "superviseForum" },
          { slug: "editUser" },
          { slug: "editUserRole" },
          { slug: "ban" },
          { slug: "deleteUser" },
        ],
      },
    },
  });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
