import { useEffect } from 'react'

const BASE_TITLE = 'Zhanx Studio — Full Stack Developer'
const BASE_DESC =
  'Zhanx Studio — Full Stack Developer crafting fast, animated, production-ready web experiences. Portfolios, landing pages, e-commerce and more.'

export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title ? `${title} — Zhanx Studio` : BASE_TITLE
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description || BASE_DESC)
  }, [title, description])
}
