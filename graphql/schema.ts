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

    now(id: ID!): Now
  }

  type Mutation {
    createEntry(content: EntryCreateContent!): Entry
    updateEntry(id: ID!, content: EntryUpdateContent!): Entry
    deleteEntry(id: ID!): Entry

    updateNow(id: ID!, content: NowUpdateContent!): Now
  }

  type Entry {
    id: ID
    title: String
    notes: String
    created_at: String
    updated_at: String
    type: Types
    cover: String
    cover_type: CoverType
    status: Status
  }

  type Now {
    id: ID
    content: String
    created_at: String
    updated_at: String
    location: String
  }

  input EntryCreateContent {
    title: String!
    notes: String!
    type: Types!
    created_at: String!
    cover: String
    cover_type: CoverType
    status: Status!
  }

  input EntryUpdateContent {
    title: String
    notes: String
    type: Types
    cover: String
    cover_type: CoverType
    status: Status
    created_at: String
  }

  input NowUpdateContent {
    content: String
    location: String
    created_at: String
  }

  enum Status {
    DRAFT
    PUBLISHED
  }

  enum CoverType {
    FILE
    LINK
  }

  enum Types {
    MOVIE
    SERIES
    POEM
    ESSAY
    STORY
    OTHER
  }
`

export default typeDefs
