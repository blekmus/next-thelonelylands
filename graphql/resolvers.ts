import { ApolloError, ForbiddenError } from 'apollo-server-errors'
import prismaClient from '../lib/prisma'

export const resolvers = {
  Query: {
    entries(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (args.perPage && args.currentPage) {
        const entries = prisma.entry.findMany({
          skip: args.perPage * (args.currentPage - 1),
          take: args.perPage,
          where: {
            type: {
              in: args.types,
            },
            status: args.status,
          },
          orderBy: {
            created_at: 'desc',
          },
        })

        return entries
      } else {
        const entries = prisma.entry.findMany({
          where: {
            type: {
              in: args.types,
            },
            status: args.status,
          },
          orderBy: {
            created_at: 'desc',
          },
        })

        return entries
      }
    },

    entry(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      const entry = prisma.entry.findFirstOrThrow({
        where: {
          id: args.id,
        },
      })
      return entry
    },

    now(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      const now = prisma.now.findFirstOrThrow({
        where: {
          id: args.id,
        },
      })
      return now
    },
  },

  Mutation: {
    async createEntry(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      const data = args.content
      data.updated_at = String(new Date().getTime())

      try {
        const entry = await prisma.entry.create({
          data: data,
        })

        return entry
      } catch (error) {
        throw new ApolloError('Creation Error')
      }
    },

    async updateEntry(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      const data = args.content
      data.updated_at = String(new Date().getTime())

      try {
        const entry = await prisma.entry.update({
          where: {
            id: args.id,
          },
          data: data,
        })

        return entry
      } catch (_e) {
        throw new ApolloError('Update Error')
      }
    },

    async deleteEntry(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      try {
        const entry = prisma.entry.delete({
          where: {
            id: args.id,
          },
        })

        return entry
      } catch (_e) {
        throw new ApolloError('Delete Error')
      }
    },

    async updateNow(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      const data = args.content
      data.updated_at = String(new Date().getTime())

      try {
        const now = await prisma.now.update({
          where: {
            id: args.id,
          },
          data: data,
        })

        return now
      } catch (_e) {
        throw new ApolloError('Update Error')
      }
    },
  },
}
