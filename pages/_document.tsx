import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ backgroundColor: '#1a1b1e' }}>
        <Head>
          {/* 'Rufina', serif */}
          <link
            href="https://fonts.googleapis.com/css2?family=Rufina:wght@400;700&display=swap"
            rel="stylesheet"
          />

          {/* 'Oxygen', sans-serif */}
          <link
            href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap"
            rel="stylesheet"
          />

          <script
            defer
            src="https://analytics.thelonelylands.com/harmless_mkay"
            data-website-id="2407c2c3-edb2-4896-a687-3a769d0dc2a9"
          ></script>

          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
