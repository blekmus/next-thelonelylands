import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    entries(
      types: [Types]
      status: Status
      currentPage: Int
      perPage: Int
    ): [Entry]!
    entry(id: ID!): Entry
    comments(currentPage: Int, perPage: Int): [Comment]!
  }

  type Mutation {
    createEntry(content: EntryCreateContent!): Entry
    updateEntry(id: ID!, content: EntryUpdateContent!): Entry
    deleteEntry(id: ID!): Entry

    createComment(content: CommentCreateContent!): Comment
    viewComments: viewComment
    deleteComment(id: ID!): Comment
  }
  

  type viewComment {
    count: Int
  }

  type Entry {
    id: ID
    title: String
    notes: String
    created_at: String
    updated_at: String
    type: Types
    cover: String
    status: Status
  }

  type Comment {
    id: ID
    name: String
    message: String
    viewed: Boolean
    created_at: String
  }

  input EntryCreateContent {
    title: String!
    notes: String!
    type: Types!
    created_at: String!
    cover: String
    status: Status!
  }

  input EntryUpdateContent {
    title: String
    notes: String
    type: Types
    cover: String
    status: Status
    created_at: String
  }

  input CommentCreateContent {
    name: String
    message: String
    token: String
  }

  enum Status {
    DRAFT
    PUBLISHED
  }

  enum Types {
    MOVIE
    SERIES
    POEM
    SHORT
    ESSAY
    STORY
    OTHER
  }
`

export default typeDefs
