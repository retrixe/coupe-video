import React from 'react'
import Head from 'next/head'
import './normalize.css'
import './skeleton.css'
import './global.scss'

export default function App ({ Component, pageProps }: {
  Component: React.FunctionComponent
  pageProps: any
}) {
  return (
    <>
      <Head>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name='viewport'
          content='user-scalable=0, initial-scale=1,
            minimum-scale=1, width=device-width, height=device-height'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
