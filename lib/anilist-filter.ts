import { MediaList, ReviewList } from '../types/anilist-filter'

interface NewEntry {
  title: string
  notes: string
  note_words: number
  id: string
  cover: string
  date: Date | undefined
}

const filterAnimeData = (data: MediaList): NewEntry[] => {
  let reduced = []

  reduced = data.MediaListCollection.lists.reduce((acc: NewEntry[], list) => {
    const filteredEntries = list.entries.filter(
      (entry) => entry.notes && entry.notes.length > 200
    )

    const output = filteredEntries.map((entry) => {
      const newEntry = {} as NewEntry

      if (entry.media.title.english) {
        newEntry.title = entry.media.title.english
      } else if (entry.media.title.romaji) {
        newEntry.title = entry.media.title.romaji
      } else {
        newEntry.title = entry.media.title.native
      }

      newEntry.notes = entry.notes ? entry.notes : ''
      newEntry.note_words = entry.notes
        ? entry.notes.split(' ').filter((item) => item.trim() !== '').length
        : 0
      newEntry.id = String(entry.id)

      if (entry.completedAt.year) {
        newEntry.date = new Date(
          `${entry.completedAt.year}-${entry.completedAt.month}-${entry.completedAt.day}`
        )
      }

      if (entry.media.bannerImage) {
        newEntry.cover = entry.media.bannerImage
      }

      return newEntry
    })

    acc = acc.concat(output)
    return acc
  }, [])

  reduced = reduced.filter(
    (value, index, self) => self.findIndex((v2) => v2.id === value.id) === index
  )

  // sort by title
  // reduced = reduced.sort((a, b) =>
  //   naturalCompare(a.title, b.title, { caseInsensitive: true })
  // )

  // sort by date
  reduced = reduced.sort((a, b) => {
    if (a.date && b.date) {
      return b.date.getTime() - a.date.getTime()
    } else {
      return 0
    }
  })

  return reduced
}

const filterMangaData = (data: MediaList): NewEntry[] => {
  let reduced = []

  reduced = data.MediaListCollection.lists.reduce((acc: NewEntry[], list) => {
    const filteredEntries = list.entries.filter(
      (entry) => entry.notes && entry.notes.length > 200
    )

    const output = filteredEntries.map((entry) => {
      const newEntry = {} as NewEntry

      if (entry.media.title.english) {
        newEntry.title = entry.media.title.english
      } else if (entry.media.title.romaji) {
        newEntry.title = entry.media.title.romaji
      } else {
        newEntry.title = entry.media.title.native
      }

      newEntry.notes = entry.notes ? entry.notes : ''
      newEntry.note_words = entry.notes
        ? entry.notes.split(' ').filter((item) => item.trim() !== '').length
        : 0
      newEntry.id = String(entry.id)

      if (entry.completedAt.year) {
        newEntry.date = new Date(
          `${entry.completedAt.year}-${entry.completedAt.month}-${entry.completedAt.day}`
        )
      }

      if (entry.media.bannerImage) {
        newEntry.cover = entry.media.bannerImage
      }

      return newEntry
    })

    acc = acc.concat(output)
    return acc
  }, [])

  reduced = reduced.filter(
    (value, index, self) => self.findIndex((v2) => v2.id === value.id) === index
  )

  // sort by date
  reduced = reduced.sort((a, b) => {
    if (a.date && b.date) {
      return b.date.getTime() - a.date.getTime()
    } else {
      return 0
    }
  })

  return reduced
}

const filterReviewData = (data: ReviewList): NewEntry[] => {
  let reduced = []

  reduced = data.Page.reviews.map((entry) => {
    const newEntry = {} as NewEntry

    if (entry.media.title.english) {
      newEntry.title = entry.media.title.english
    } else if (entry.media.title.romaji) {
      newEntry.title = entry.media.title.romaji
    } else {
      newEntry.title = entry.media.title.native
    }

    newEntry.notes = entry.body
    newEntry.note_words = entry.body.split(' ').length
    newEntry.id = String(entry.id)
    newEntry.date = new Date(entry.createdAt * 1000)

    if (entry.media.bannerImage) {
      newEntry.cover = entry.media.bannerImage
    }

    return newEntry
  })

  // sort by date
  reduced = reduced.sort((a, b) => {
    if (a.date && b.date) {
      return b.date.getTime() - a.date.getTime()
    } else {
      return 0
    }
  })

  return reduced
}

const filterData = { filterAnimeData, filterMangaData, filterReviewData }

export default filterData
