const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const entries = [
  {
    title: 'This is the title of this',
    notes:
      'slkfj salfk saf safsf sd s sd fasd f sfd s fds df sd sdf sd df g sdf fdgh est er d ',
    created_at: new Date(),
    updated_at: new Date(),
    type: 'SERIES',
    cover: 'https://imgur.com',
    status: 'published',
  },
  {
    title: 'This of this',
    notes:
      'slkfj salfk saf safsf sd s sd fasd f sfd s fds df sd sdf sd df g sdf fdgh est er d ',
    created_at: new Date(),
    updated_at: new Date(),
    type: 'MOVIE',
    cover: 'https://imgur.com',
    status: 'draft',
  },
  {
    title: 'This is thefs dfs dsd',
    notes:
      'slkfj salfk saf safsf sd s sd fasd f sfd s fds df sd sdf sd df g sdf fdgh est er d ',
    created_at: new Date(),
    updated_at: new Date(),
    type: 'MOVIE',
    cover: 'https://imgur.com',
    status: 'published',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of entries) {
    const user = await prisma.entry.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
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
