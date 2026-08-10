import { useEffect, useState, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export default function CountUp({ value, duration = 1.2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const numeric = parseFloat(value)
  const suffix = String(value).replace(/[0-9.]+/g, '')

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState(Number.isNaN(numeric) ? value : '0')

  useEffect(() => {
    if (inView && !Number.isNaN(numeric)) motionValue.set(numeric)
  }, [inView, numeric, motionValue])

  useEffect(() => {
    if (Number.isNaN(numeric)) return
    const unsub = spring.on('change', (latest) => {
      setDisplay(`${Math.round(latest)}${suffix}`)
    })
    return unsub
  }, [spring, suffix, numeric])

  return <span ref={ref} className={className}>{display}</span>
}
