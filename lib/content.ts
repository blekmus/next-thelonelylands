import fs from 'fs'
import path from 'path'

export type ArticleType = 'MOVIE' | 'SERIES' | 'POEM' | 'ESSAY' | 'STORY' | 'OTHER'

export interface ArticleEntry {
  id: string
  slug: string
  title: string
  notes: string
  excerpt: string
  cover: string
  cover_type: 'FILE' | 'LINK'
  coverAlt: string | null
  created_at: string
  updated_at: string
  type: ArticleType
  status: 'PUBLISHED' | 'DRAFT'
}

interface Frontmatter {
  title?: string
  type?: string
  publishedAt?: string
  updatedAt?: string
  cover?: string
  coverAlt?: string
  draft?: boolean
  excerpt?: string
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

const typeMap: Record<string, ArticleType> = {
  movie: 'MOVIE',
  series: 'SERIES',
  poem: 'POEM',
  essay: 'ESSAY',
  story: 'STORY',
  other: 'OTHER',
}

function parseValue(value: string) {
  const trimmed = value.trim()

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseMarkdownFile(source: string) {
  if (!source.startsWith('---')) {
    return { data: {} as Frontmatter, content: source.trim() }
  }

  const end = source.indexOf('\n---', 3)
  if (end === -1) {
    return { data: {} as Frontmatter, content: source.trim() }
  }

  const rawData = source.slice(3, end).trim()
  const content = source.slice(end + 4).trim()
  const data = rawData.split('\n').reduce<Record<string, unknown>>((acc, line) => {
    const separator = line.indexOf(':')
    if (separator === -1) return acc

    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1)
    acc[key] = parseValue(value)
    return acc
  }, {})

  return { data: data as Frontmatter, content }
}

function wordExcerpt(content: string) {
  return content
    .replace(/[#>*_`[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240)
}

function getTimestamp(date: string | undefined, fallback = Date.now()) {
  if (!date) return String(fallback)

  const timestamp = new Date(date).getTime()
  return Number.isNaN(timestamp) ? String(fallback) : String(timestamp)
}

function normalizeType(type: string | undefined): ArticleType {
  if (!type) return 'OTHER'
  return typeMap[type.toLowerCase()] || 'OTHER'
}

function coverType(cover: string | undefined): 'FILE' | 'LINK' {
  if (!cover) return 'LINK'
  return cover.startsWith('http://') || cover.startsWith('https://')
    ? 'LINK'
    : 'FILE'
}

export function getAllArticles(includeDrafts = false): ArticleEntry[] {
  if (!fs.existsSync(articlesDirectory)) return []

  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(articlesDirectory, file)
      const { data, content } = parseMarkdownFile(fs.readFileSync(filePath, 'utf8'))
      const createdAt = getTimestamp(data.publishedAt)
      const updatedAt = getTimestamp(data.updatedAt, Number(createdAt))

      return {
        id: slug,
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        notes: content,
        excerpt: data.excerpt || wordExcerpt(content),
        cover: data.cover || '',
        cover_type: coverType(data.cover),
        coverAlt: data.coverAlt || null,
        created_at: createdAt,
        updated_at: updatedAt,
        type: normalizeType(data.type),
        status: data.draft ? 'DRAFT' as const : 'PUBLISHED' as const,
      }
    })
    .filter((article) => includeDrafts || article.status === 'PUBLISHED')
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug) || null
}

export function getAdjacentArticles(slug: string, limit = 2) {
  const articles = getAllArticles().sort(
    (a, b) => Number(a.created_at) - Number(b.created_at)
  )
  const index = articles.findIndex((article) => article.slug === slug)

  if (index === -1) return []

  const after = articles.slice(index + 1, index + 1 + limit)
  const before = articles.slice(Math.max(0, index - limit), index).reverse()

  return [...after, ...before]
    .slice(0, limit)
    .sort((a, b) => Number(a.created_at) - Number(b.created_at))
}
