import cors from 'cors'
import express from 'express'
import path from 'path'

const app = express()
app.use(cors())

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'static', 'index.html'))
})

app.get('/progress', (_, res) => {
  res.set('Content-Type', 'text/event-stream')

  let progress = 0

  const interval = setInterval(() => {
    progress += Math.round(Math.random() * 10)

    res.write(`data: {"progress": ${progress}}\n\n`)

    if (progress >= 100) {
      clearInterval(interval)
      res.end()
    }
  }, 800)
})

app.listen(3333, () => {
  console.log('🚀 Running on http://localhost:3333')
})
