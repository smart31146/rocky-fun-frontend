"use client"

import { StaticRequire } from "next/dist/shared/lib/get-img-props"
import Image, { ImageProps, StaticImageData } from "next/image"
import { useEffect, useState } from "react"

export interface ImageWithFallbackProps extends ImageProps {
  fallback: string
}

const ImageWithFallback = ({ src: srcPrimitive, fallback, ...props }: ImageWithFallbackProps) => {
  const [src, setSrc] = useState<string | StaticRequire | StaticImageData>(srcPrimitive)

  useEffect(() => {
    setSrc(srcPrimitive)
  }, [srcPrimitive])
  return <Image {...props} src={src} onError={() => setSrc(fallback)} />
}

export default ImageWithFallback
