import { useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function ScrollLockedVideoHero({
  videoSrc,
  posterSrc,
  title,
  tagline,
  eyebrow,
  scrollHint = 'Scroll',
  scrubDistance = 3200,
}) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const hintRef = useRef(null)
  const progressRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const body = document.body
    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    }

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let started = false
    let locked = false
    let completedForward = false
    let lockedScrollY = 0
    let touchY = 0
    let seeking = false
    let pendingTime = null

    const onMediaReady = () => {
      duration = video.duration || 0
      if (!duration) return
      setReady(true)
      if (reduceMotion && duration) video.currentTime = duration * 0.92
    }

    const onSeeked = () => {
      seeking = false
      if (pendingTime === null) return
      const nextTime = pendingTime
      pendingTime = null
      seekTo(nextTime)
    }

    const seekTo = (time) => {
      if (Math.abs(video.currentTime - time) < 0.01) return
      if (seeking) {
        pendingTime = time
        return
      }
      seeking = true
      video.currentTime = time
    }

    const engageLock = () => {
      if (locked || reduceMotion) return
      locked = true
      lockedScrollY = window.scrollY
      section.classList.add('is-locked')
      body.style.position = 'fixed'
      body.style.top = '-' + lockedScrollY + 'px'
      body.style.left = '0'
      body.style.right = '0'
      body.style.width = '100%'
    }

    const releaseLock = (continueDown = false) => {
      if (!locked) return
      locked = false
      section.classList.remove('is-locked')
      body.style.position = previousBody.position
      body.style.top = previousBody.top
      body.style.left = previousBody.left
      body.style.right = previousBody.right
      body.style.width = previousBody.width
      window.scrollTo(0, lockedScrollY)
      if (continueDown) requestAnimationFrame(() => window.scrollTo(0, 2))
    }

    const addDelta = (deltaY) => {
      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      if (targetProgress > 0.001) started = true
    }

    const handleDelta = (deltaY, event) => {
      if (!locked && window.scrollY <= 1 && deltaY < 0 && currentProgress > 0.001) {
        completedForward = false
        engageLock()
      }
      if (!locked) return

      event.preventDefault()
      if (targetProgress >= 0.999 && deltaY > 0) {
        completedForward = true
        releaseLock(true)
        return
      }
      addDelta(deltaY)
    }

    const onWheel = (event) => handleDelta(event.deltaY, event)
    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY || 0
    }
    const onTouchMove = (event) => {
      const nextY = event.touches[0]?.clientY || touchY
      const deltaY = touchY - nextY
      touchY = nextY
      handleDelta(deltaY, event)
    }
    const onScroll = () => {
      if (!completedForward && window.scrollY <= 1) engageLock()
    }

    const frame = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18

      if (duration > 0) seekTo(currentProgress * duration)
      video.style.transform = 'scale(' + (1 + currentProgress * 0.06) + ')'

      const titleProgress = 1 - clamp(currentProgress / 0.35, 0, 1)
      titleRef.current.style.opacity = String(titleProgress)
      titleRef.current.style.transform = 'translateY(' + ((1 - titleProgress) * -24) + 'px) scale(' + (0.96 + titleProgress * 0.04) + ')'
      titleRef.current.style.filter = 'blur(' + ((1 - titleProgress) * 10) + 'px)'

      const taglineProgress = clamp((currentProgress - 0.82) / 0.18, 0, 1)
      taglineRef.current.style.opacity = String(taglineProgress)
      taglineRef.current.style.transform = 'translateY(' + ((1 - taglineProgress) * 20) + 'px) scale(' + (0.97 + taglineProgress * 0.03) + ')'
      taglineRef.current.style.filter = 'blur(' + ((1 - taglineProgress) * 8) + 'px)'

      hintRef.current.style.opacity = started ? '0' : '1'
      progressRef.current.style.transform = 'scaleX(' + currentProgress + ')'
      rafId = requestAnimationFrame(frame)
    }

    video.addEventListener('loadedmetadata', onMediaReady)
    video.addEventListener('loadeddata', onMediaReady)
    video.addEventListener('canplay', onMediaReady)
    video.addEventListener('seeked', onSeeked)

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) onMediaReady()

    if (!reduceMotion) {
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('scroll', onScroll)
      if (window.scrollY <= 1) engageLock()
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener('loadedmetadata', onMediaReady)
      video.removeEventListener('loadeddata', onMediaReady)
      video.removeEventListener('canplay', onMediaReady)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance])

  return (
    <section ref={sectionRef} className={'scroll-video-hero ' + (ready ? 'is-ready' : '')}>
      <img src={posterSrc} alt="" className="scroll-video-poster" />
      <video ref={videoRef} src={videoSrc} poster={posterSrc} muted playsInline preload="auto" aria-hidden="true" />
      <div className="scroll-video-shade" />

      <div ref={titleRef} className="scroll-video-title">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
      </div>

      <div ref={taglineRef} className="scroll-video-tagline">
        <span>{tagline}</span>
      </div>

      <div ref={hintRef} className="scroll-video-hint">
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true">
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="scroll-video-route">HKG / CN / GLOBAL</span>
      <div className="scroll-video-progress"><span ref={progressRef} /></div>
    </section>
  )
}
