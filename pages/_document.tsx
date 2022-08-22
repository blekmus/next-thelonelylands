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
