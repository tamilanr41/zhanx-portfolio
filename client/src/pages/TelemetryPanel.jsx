import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function TelemetryPanel({
  nodeName,
  streamLabel,
  logs,
  hubs,
  stats,
  accent = '#c9a84c',
}) {
  const [currentTime, setCurrentTime] = useState('')
  const [streamLogs, setStreamLogs] = useState(logs.slice(0, 4))

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setCurrentTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const clockInterval = setInterval(updateTime, 1000)

    const logInterval = setInterval(() => {
      setStreamLogs(prev => {
        const next = logs[Math.floor(Math.random() * logs.length)]
        return [...prev.slice(-6), next]
      })
    }, 3500)

    return () => {
      clearInterval(clockInterval)
      clearInterval(logInterval)
    }
  }, [logs])

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Telemetry console */}
      <div className="p-6 rounded-[24px] border border-[--border] bg-[--card]/60 backdrop-blur-md relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-[--border] pb-3 mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: accent }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {streamLabel}
          </span>
          <span className="text-[9px] font-mono text-[--muted-foreground]">{nodeName}</span>
        </div>
        <div className="bg-black/90 rounded-xl p-4 font-mono text-[11px] text-green-400 min-h-[160px] flex flex-col justify-between overflow-hidden shadow-inner border border-[--border]">
          <div className="space-y-1.5">
            {streamLogs.map((log, idx) => (
              <p key={idx} className={log.includes('CRITICAL') || log.includes('FAIL') ? 'text-red-400' : log.includes('credentials') || log.includes('syncing') ? 'text-yellow-500' : 'text-green-400'}>
                {log}
              </p>
            ))}
          </div>
          <p className="text-green-500 animate-pulse">&gt; streaming...</p>
        </div>
      </div>

      {/* Operational hubs */}
      <div className="p-6 rounded-[24px] border border-[--border] bg-[--card]/30">
        <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
          Operational Hubs
        </h5>
        <div className="text-xs text-[--muted-foreground] space-y-1 font-mono">
          {hubs.map((h, i) => (
            <p key={i}>📍 {h}</p>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-[--border]">
          <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
            Network Telemetry
          </h5>
          <div className="space-y-2.5 font-mono text-xs">
            {stats.map((s, i) => (
              <div key={i} className="flex justify-between border-b border-[--border] pb-1.5">
                <span className="text-[--muted-foreground]">{s.label}</span>
                <span className="font-bold" style={{ color: s.status === 'ONLINE' || s.status === 'ACTIVE' ? '#22c55e' : undefined }}>
                  {s.status === 'ONLINE' || s.status === 'ACTIVE' ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: '#22c55e' }}></span>
                      {s.status}
                    </span>
                  ) : s.status ? s.status : s.value}
                  {s.value && !s.status && ` ${s.value}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local time */}
      <div className="p-6 rounded-[24px] border border-[--border] bg-[--card]/30 flex flex-col justify-center">
        <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-1">LOCAL TIME</span>
        <span className="font-mono text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: accent }}>
          {currentTime || '00:00:00'}
        </span>
        <span className="text-[10px] text-[--muted-foreground] font-mono block mt-1">GMT+5:30 (India Standard Time)</span>
      </div>
    </motion.div>
  )
}
