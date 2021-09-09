import React, { useRef, useState } from 'react'
import ffmpegCut from '../imports/ffmpegCut'
import Title from '../imports/title'

import styles from './index.module.scss'

// TODO: Titles and HTML5 meta.
const Index = () => {
  const videoRef = useRef(null)
  const [file, setFile] = useState(null)
  const [endTime, setEndTime] = useState('')
  const [startTime, setStartTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCut = async () => {
    try {
      setLoading(true)
      const blob = await ffmpegCut(file[0], startTime, endTime)
      const url = URL.createObjectURL(blob)
      setFile([blob, url])
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading('')
    }
  }

  return (
    <>
      <Title title='Coupe-vidéo' description='Cut videos in the browser, no watermark or upload.' url='/' />
      <div
        className={styles.container} onDragOver={e => {
          e.stopPropagation()
          e.preventDefault()
          e.dataTransfer.dropEffect = 'copy'
        }} onDrop={e => {
          e.stopPropagation()
          e.preventDefault()
          const files = e.dataTransfer.files
          if (files.length === 1) setFile([files[0], URL.createObjectURL(files[0])])
        }}
      >
        <div>
          <label htmlFor='startTimeInput'>Start Time</label>
          <input
            value={startTime} onChange={e => setStartTime(e.target.value)}
            className='u-full-width' placeholder='hh:mm:ss' id='startTimeInput'
          />
        </div>
        <div>
          <label htmlFor='endTimeInput'>End Time</label>
          <input
            value={endTime} onChange={e => setEndTime(e.target.value)}
            className='u-full-width' placeholder='hh:mm:ss' id='endTimeInput'
          />
        </div>
        <button className='button-primary' disabled={!file} onClick={handleCut}>Cut Video</button>
        {loading && typeof loading !== 'string' && <h6>Cutting the video in your browser..</h6>}
        {typeof loading === 'string' && <h6>An error occurred when cutting the video.</h6>}
        <hr />
        {file
          ? <video ref={videoRef} width={document.body.clientWidth - 64} controls src={file[1]} />
          : <h2>Drag and drop a video here.</h2>}
      </div>
    </>
  )
}

export default Index
