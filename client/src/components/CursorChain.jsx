import { useEffect, useRef } from 'react'

const N = 11
const BASE = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5]

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function CursorChain() {
  const dotRefs = useRef([])
  const mouse = useRef({ x: -100, y: -100 })
  const visible = useRef(false)
  const raf = useRef(null)

  useEffect(() => {
    if (isTouchDevice()) return

    const positions = Array.from({ length: N }, () => ({ x: -100, y: -100 }))

    const onMove = (e) => {
      visible.current = true
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onLeave = () => { visible.current = false }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    const step = () => {
      const head = positions[0]
      head.x += (mouse.current.x - head.x) * 0.4
      head.y += (mouse.current.y - head.y) * 0.4

      for (let i = 1; i < N; i++) {
        const a = positions[i - 1]
        const b = positions[i]
        b.x += (a.x - b.x) * 0.32
        b.y += (a.y - b.y) * 0.32
      }

      for (let i = 0; i < N; i++) {
        const el = dotRefs.current[i]
        if (!el) continue
        const p = positions[i]
        const size = BASE[i]
        el.style.transform = `translate3d(${p.x - size / 2}px, ${p.y - size / 2}px, 0)`
        el.style.opacity = visible.current ? String(1 - (i / N) * 0.7) : '0'
      }

      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[80]" aria-hidden="true">
      {BASE.map((size, i) => (
        <div
          key={i}
          ref={(el) => (dotRefs.current[i] = el)}
          className="absolute top-0 left-0 rounded-full opacity-0"
          style={{
            width: size,
            height: size,
            background: 'radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(201,168,76,0.9) 55%, rgba(201,168,76,0.2) 100%)',
            boxShadow: i < 2 ? '0 0 10px rgba(201,168,76,0.7)' : 'none',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
