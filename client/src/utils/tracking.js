function setCookie(name, value, days = 365) {
  const d = new Date()
  d.setTime(d.getTime() + days * 864e5)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

function increment(name) {
  const val = parseInt(getCookie(name) || '0', 10) + 1
  setCookie(name, val)
  return val
}

export function trackPageVisit() {
  const count = increment('page_visits')
  console.log(`[Track] Page visits: ${count}`)
  return count
}

export function trackFormSubmit() {
  const count = increment('form_submissions')
  console.log(`[Track] Form submissions: ${count}`)
  return count
}

export function getStats() {
  return {
    pageVisits: parseInt(getCookie('page_visits') || '0', 10),
    formSubmissions: parseInt(getCookie('form_submissions') || '0', 10),
  }
}
