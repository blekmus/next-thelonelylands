const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


async function main() {
  // get data.json file data
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const entries = require('./data.json')

  console.log(`Start seeding ...`)

  // delete all existing entries
  await prisma.entry.deleteMany()

  for (const u of entries) {
    const entry = await prisma.entry.create({
      data: u,
    })
    console.log(`Created entry with title: ${entry.title}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
