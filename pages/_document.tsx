import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const ico = '/favicon_256.png'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <link rel='icon' href={ico} />
          <meta charSet='utf-8' />
          {/* PWA primary color */}
          <meta name='theme-color' content='#33C3F0' />
          <link rel='manifest' href='/manifest.json' />
          {/* Open Graph Protocol support. */}
          <meta property='og:type' content='website' />
          <meta property='og:image' content={ico} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
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
