import React from 'react'
import './normalize.css'
import './skeleton.css'
import './global.scss'

// TODO: More meta tags.

export default function MyApp ({ Component, pageProps }: {
  Component: React.FunctionComponent
  pageProps: any
}) {
  return <Component {...pageProps} />
}
