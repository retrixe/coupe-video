import React from 'react'
import Head from 'next/head'

export default function Title ({ title, description, url }: {
  title: string
  description: string
  url: string
}): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={description} />
      <meta name='Description' content={description} />
    </Head>
  )
}
