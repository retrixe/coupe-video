import React, { useRef, useState } from 'react'
import ffmpegCut from '../imports/ffmpegCut'
import Title from '../imports/title'

import styles from './index.module.scss'

// TODO: Titles and HTML5 meta.
const Index = () => {
  const videoRef = useRef(null)
  const [fileInView, setFileInView] = useState(null)
  const [originalFile, setOriginalFile] = useState(null)
  const [currentView, setCurrentView] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCut = async () => {
    try {
      setLoading(true)
      const blob = await ffmpegCut(fileInView[0], startTime, endTime)
      const url = URL.createObjectURL(blob)
      setCurrentView('Original')
      setFileInView([blob, url])
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading('')
    }
  }

  const handleToggle = () => {
    setCurrentView(currentView !== 'Edited' ? 'Edited' : 'Original')
    setOriginalFile(fileInView)
    setFileInView(originalFile)
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
          if (files.length === 1) {
            setCurrentView('')
            setFileInView([files[0], URL.createObjectURL(files[0])])
            setOriginalFile([files[0], URL.createObjectURL(files[0])])
          }
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
        <button className='button-primary' disabled={!fileInView} onClick={handleCut}>Cut Video</button>
        {currentView && <button className={styles['left-width']} onClick={handleToggle}>Return to {currentView}</button>}
        {loading && typeof loading !== 'string' && <h6>Cutting the video in your browser..</h6>}
        {typeof loading === 'string' && <h6>An error occurred when cutting the video.</h6>}
        <hr />
        {fileInView
          ? <video ref={videoRef} width={document.body.clientWidth - 64} controls src={fileInView[1]} />
          : <h2>Drag and drop a video here.</h2>}
      </div>
    </>
  )
}

export default Index
