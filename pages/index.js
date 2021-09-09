import React, { useRef, useState } from 'react'

import styles from './index.module.scss'

// TODO: Titles and HTML5 meta
const Index = () => {
  const [file, setFile] = useState(null)
  const videoRef = useRef(null)
  const width = document.body.clientWidth - 64
  return (
    <>
      <div className={styles.container} onDragOver={e => {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      }} onDrop={e => {
        e.stopPropagation()
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files.length === 1) setFile([files[0], URL.createObjectURL(files[0])])
      }}>
        {file
          ? <video ref={videoRef} width={width} controls src={file[1]} />
          : <h2>Drop a video on the website.</h2>}
      </div>
    </>
  )
}

export default Index
