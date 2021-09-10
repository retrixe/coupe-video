import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'

let ffmpeg: FFmpeg
try {
  if (typeof document !== 'undefined') {
    ffmpeg = createFFmpeg({
      corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
      log: true
    })
  }
} catch (e) {}
let loaded = false

export default async function ffmpegCut (file: Blob, start: string, end: string): Promise<Blob> {
  if (!loaded) await ffmpeg.load()
  loaded = true
  const fileName = (file instanceof File ? file.name : '') || Math.random().toString().substr(2) + '.mp4'
  ffmpeg.FS('writeFile', fileName, await fetchFile(file))
  const randomFileName = Math.random().toString().substr(2) + '.mp4'
  await ffmpeg.run('-i', fileName, '-ss', start, '-to', end, '-c', 'copy', randomFileName)
  const data = ffmpeg.FS('readFile', randomFileName)
  return new Blob([data.buffer], { type: 'video/mp4' })
}
