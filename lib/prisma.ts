import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  // new PrismaClient({
  //   log: ['query'],
  // })
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma


// import { Prisma, PrismaClient } from '@prisma/client'

// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient
//     }
//   }
// }

// let prisma: PrismaClient

// if (typeof window === 'undefined') {
//   if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient()
//   } else {
//     if (!global.prisma) {
//       global.prisma = new PrismaClient()
//     }

//     prisma = global.prisma
//   }
// }

// export default prisma