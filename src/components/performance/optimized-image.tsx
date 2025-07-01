"use client"

import type React from "react"
import { useState, useCallback, memo } from "react"
import { useIntersectionObserver } from "../../hooks/use-performance"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  quality?: number
  priority?: boolean
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(
  ({ src, alt, width, height, className = "", placeholder = "/placeholder.svg", quality = 75, priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    
    // Get the ref and intersection status from the hook
    const { elementRef, isIntersecting } = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: "50px",
    })

    const handleLoad = useCallback(() => {
      setIsLoaded(true)
    }, [])

    const handleError = useCallback(() => {
      setHasError(true)
    }, [])

    // Generate optimized image URL
    const getOptimizedSrc = useCallback(
      (originalSrc: string) => {
        if (originalSrc.includes("placeholder.svg")) {
          return originalSrc
        }

        // In a real app, you'd use a service like Cloudinary or Next.js Image Optimization
        const params = new URLSearchParams()
        if (width) params.append("w", width.toString())
        if (height) params.append("h", height.toString())
        params.append("q", quality.toString())
        params.append("f", "webp")

        return `${originalSrc}?${params.toString()}`
      },
      [width, height, quality],
    )

    const shouldLoad = priority || isIntersecting

    return (
      <div ref={elementRef as React.RefObject<HTMLDivElement>} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
        {/* Placeholder */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center"
            style={{
              backgroundImage: `url(${placeholder})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Actual Image */}
        {shouldLoad && !hasError && (
          <img
            src={getOptimizedSrc(src) || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-red-400 text-xl">⚠</span>
              </div>
              <p className="text-gray-400 text-sm">Failed to load image</p>
            </div>
          </div>
        )}
      </div>
    )
  },
)

OptimizedImage.displayName = "OptimizedImage"

export default OptimizedImage