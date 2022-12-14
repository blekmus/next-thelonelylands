/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://' + process.env.VERCEL_URL || 'http://localhost:3000',
  exclude: ['/api/*', '/admin/*', '/admin', '/server-sitemap.xml'],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api', '/admin'],
      },
    ],
    additionalSitemaps: [
      `${'https://' + process.env.VERCEL_URL || 'http://localhost:3000'}/server-sitemap.xml`,
    ],
  }
}