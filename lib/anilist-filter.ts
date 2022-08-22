import naturalCompare from 'string-natural-compare'

interface Entry {
  title: string
  notes: string
  note_words: number
  id: string
  cover: string
  date: Date | undefined
}

const filterAnimeData = (data: any): [Entry] => {
  let reduced = []

  reduced = data.MediaListCollection.lists.reduce((acc: any, list: any) => {
    let entries = list.entries
    entries = entries.filter((entry: any) => entry.notes !== null)
    entries = entries.filter((entry: any) => entry.notes.length > 200)

    entries = entries.map((entry: any) => {
      const newEntry = {} as Entry

      if (entry.media.title.english) {
        newEntry.title = entry.media.title.english
      } else if (entry.media.title.romaji) {
        newEntry.title = entry.media.title.romaji
      } else {
        newEntry.title = entry.media.title.native
      }

      newEntry.notes = entry.notes
      newEntry.note_words = entry.notes
        .split(' ')
        .filter((item: any) => item.trim() !== '').length
      newEntry.id = entry.id

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

    acc = acc.concat(entries)
    return acc
  }, [])

  reduced = reduced.filter(
    (value: any, index: any, self: any) =>
      self.findIndex((v2: any) => v2.id === value.id) === index
  )

  reduced = reduced.sort((a: Entry, b: Entry) =>
    naturalCompare(a.title, b.title, { caseInsensitive: true })
  )

  return reduced
}

const filterMangaData = (data: any): [Entry] => {
  let reduced = []

  reduced = data.MediaListCollection.lists.reduce((acc: any, list: any) => {
    let entries = list.entries
    entries = entries.filter((entry: any) => entry.notes !== null)
    entries = entries.filter((entry: any) => entry.notes.length > 200)

    entries = entries.map((entry: any) => {
      const newEntry = {} as Entry

      if (entry.media.title.english) {
        newEntry.title = entry.media.title.english
      } else if (entry.media.title.romaji) {
        newEntry.title = entry.media.title.romaji
      } else {
        newEntry.title = entry.media.title.native
      }

      newEntry.notes = entry.notes
      newEntry.note_words = entry.notes.split(' ').length
      newEntry.id = entry.id

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

    acc = acc.concat(entries)
    return acc
  }, [])

  reduced = reduced.filter(
    (value: any, index: any, self: any) =>
      self.findIndex((v2: any) => v2.id === value.id) === index
  )

  reduced = reduced.sort((a: Entry, b: Entry) =>
    naturalCompare(a.title, b.title, { caseInsensitive: true })
  )

  return reduced
}

const filterReviewData = (data: any): [Entry] => {
  let reduced = []

  reduced = data.Page.reviews.map((entry: any) => {
    const newEntry = {} as Entry

    if (entry.media.title.english) {
      newEntry.title = entry.media.title.english
    } else if (entry.media.title.romaji) {
      newEntry.title = entry.media.title.romaji
    } else {
      newEntry.title = entry.media.title.native
    }

    newEntry.notes = entry.body
    newEntry.note_words = entry.body.split(' ').length
    newEntry.id = entry.id
    newEntry.date = new Date(entry.createdAt * 1000)

    if (entry.media.bannerImage) {
      newEntry.cover = entry.media.bannerImage
    }

    return newEntry
  })

  reduced = reduced.sort((a: Entry, b: Entry) =>
    naturalCompare(a.title, b.title, { caseInsensitive: true })
  )

  return reduced
}

const filterData = { filterAnimeData, filterMangaData, filterReviewData }

export default filterData
