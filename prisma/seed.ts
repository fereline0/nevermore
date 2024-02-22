import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const abilities = await prisma.ability.createMany({
    data: [
      { slug: "deleteUser" },
      { slug: "deleteComment" },
      { slug: "deleteArticle" },
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
      color: "f3f4f6",
    },
  });

  const moderator = await prisma.role.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      name: "Moderator",
      color: "0ebd00",
      abilities: {
        connect: [{ slug: "deleteComment" }, { slug: "deleteArticle" }],
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
      color: "ff0000",
      abilities: {
        connect: [
          { slug: "deleteComment" },
          { slug: "deleteArticle" },
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
      color: "ffb2fa",
      abilities: {
        connect: [
          { slug: "deleteComment" },
          { slug: "deleteArticle" },
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
