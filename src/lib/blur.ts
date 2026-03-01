// lib/blur.ts

import path from "path"
import sharp from "sharp"

export async function getBlurDataURL(src: string): Promise<string | undefined> {
  try {
    let buffer: Buffer

    if (src.startsWith("http")) {
      // remote image
      const res = await fetch(src)
      buffer = Buffer.from(await res.arrayBuffer())
    } else {
      // local image from /public
      const filePath = path.join(process.cwd(), "public", src)
      buffer = require("fs").readFileSync(filePath)
    }

    const resized = await sharp(buffer).resize(10).toBuffer()

    return `data:image/png;base64,${resized.toString("base64")}`
  } catch {
    return undefined
  }
}
