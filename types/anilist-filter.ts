export interface MediaList {
  MediaListCollection: MediaListCollection
}

interface MediaListCollection {
  __typename: string
  lists: List[]
}

interface List {
  __typename: string
  entries: Entry[]
}

interface Entry {
  __typename: string
  id: number
  notes?: string
  completedAt: CompletedAt
  media: Media
}

interface CompletedAt {
  __typename: string
  year?: number
  month?: number
  day?: number
}

interface Media {
  __typename: string
  bannerImage?: string
  title: Title
}

interface Title {
  __typename: string
  romaji: string
  english?: string
  native: string
}



export interface ReviewList {
  Page: Page
}

interface Page {
  __typename: string
  reviews: Review[]
}

interface Review {
  __typename: string
  body: string
  id: number
  createdAt: number
  media: Media
}

