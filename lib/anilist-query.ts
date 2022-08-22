import { gql } from '@apollo/client'

const ANIMEQUERY = gql`
  query {
    MediaListCollection(userName: "blekmus", type: ANIME) {
      lists {
        entries {
          id
          notes
          completedAt {
            year
            month
            day
          }
          media {
            bannerImage
            title {
              romaji
              english
              native
            }
          }
        }
      }
    }
  }
`

const MANGAQUERY = gql`
  query {
    MediaListCollection(userName: "blekmus", type: MANGA) {
      lists {
        entries {
          id
          notes
          completedAt {
            year
            month
            day
          }
          media {
            bannerImage
            title {
              romaji
              english
              native
            }
          }
        }
      }
    }
  }
`

const REVIEWQUERY = gql`
  query {
    Page(perPage: 50) {
      reviews(userId: 695637) {
        body
        id
        createdAt
        media {
          bannerImage
          title {
            english
            native
            romaji
          }
        }
      }
    }
  }
`

const queries = { ANIMEQUERY, MANGAQUERY, REVIEWQUERY }

export default queries
