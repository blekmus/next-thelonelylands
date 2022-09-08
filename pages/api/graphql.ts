import { ApolloServer } from 'apollo-server-micro'
import typeDefs from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import Cors from 'micro-cors'
// import {
//   ApolloServerPluginLandingPageLocalDefault,
//   ApolloServerPluginLandingPageGraphQLPlayground,
// } from 'apollo-server-core'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

const cors = Cors()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx: { req: MicroRequest }) => {
    const session = await getSession(ctx)
    return { prisma, session }
  },
  csrfPrevention: true,

  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground({
    //   settings: {
    //     'request.credentials': 'include',
    //   },
    // }),
    // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
