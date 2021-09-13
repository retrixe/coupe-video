import React from 'react'
import Head from 'next/head'
import './normalize.css'
import './skeleton.css'
import './global.scss'

export default function App ({ Component, pageProps }: {
  Component: React.FunctionComponent
  pageProps: any
}) {
  React.useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.log('Service worker registration failed: ', err))
    }
  }, [])

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
