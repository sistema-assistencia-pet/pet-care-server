import { Readable } from 'stream'

export const convertBufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable({
    read() {
      this.push(buffer)
      this.push(null)
    }
  })

  return stream
}
