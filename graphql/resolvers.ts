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

    comments(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (args.perPage && args.currentPage) {
        const comments = prisma.comment.findMany({
          skip: args.perPage * (args.currentPage - 1),
          take: args.perPage,
          where: {
            viewed: args.viewed,
          },
          orderBy: {
            created_at: 'desc',
          },
        })

        return comments
      } else {
        const comments = prisma.comment.findMany({
          where: {
            viewed: args.viewed,
          },
          orderBy: {
            created_at: 'desc',
          },
        })

        return comments
      }
    },
  },

  Mutation: {
    async createEntry(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      let data = args.content
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

      let data = args.content
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

    async createComment(_: any, args: any, context: any) {
      let data = args.content

      const captchaResult = await (
        await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=6Le6HHghAAAAAN-Q_DJRnkNNvaLBUp9pxjn6NCLl&response=${data.token}`,
        })
      ).json()

      if (captchaResult.success === false || captchaResult.score < 0.5) {
        throw new ApolloError('Captcha Faliure')
      }

      data.created_at = String(new Date().getTime())
      delete data.token

      const prisma: typeof prismaClient = context.prisma

      try {
        const comment = await prisma.comment.create({
          data: data,
        })

        const discord = {
          embeds: [
            {
              title: 'New Comment on thelonelylands',
              color: 6184036,
              timestamp: new Date(),
              fields: [
                {
                  name: 'Name',
                  value: comment.name,
                },
                {
                  name: 'Message',
                  value: comment.message,
                },
              ],
            },
          ],
        }

        // make a request to discord webhook
        if (process.env.DISCORD_WEBHOOK) {
          await fetch(process.env.DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(discord),
          })
        }

        return comment
      } catch (error) {
        throw new ApolloError('Creation Error')
      }
    },

    async viewComments(_: any, _args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      try {
        const updatedCommentCount = await prisma.comment.updateMany({
          where: {
            viewed: false,
          },
          data: {
            viewed: true,
          },
        })
        return updatedCommentCount
      } catch (_e) {
        throw new ApolloError('Update Error')
      }
    },

    async deleteComment(_: any, args: any, context: any) {
      const prisma: typeof prismaClient = context.prisma

      if (!context.session)
        throw new ForbiddenError("Hm. What do you think you're doing?")

      try {
        const comment = prisma.comment.delete({
          where: {
            id: args.id,
          },
        })

        return comment
      } catch (_e) {
        throw new ApolloError('Delete Error')
      }
    },
  },
}
