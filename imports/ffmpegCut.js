const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg')

let ffmpeg
try {
  if (document) {
    ffmpeg = createFFmpeg({
      corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
      log: true
    })
  }
} catch (e) {}

export default async function ffmpegCut (file, start, end) {
  await ffmpeg.load()
  ffmpeg.FS('writeFile', file.name, await fetchFile(file))
  const randomFileName = Math.random().toString() + '.mp4'
  await ffmpeg.run('-i', file.name, '-ss', start, '-to', end, '-c', 'copy', randomFileName)
  const data = ffmpeg.FS('readFile', randomFileName)
  return new Blob([data.buffer], { type: 'video/mp4' })
}
