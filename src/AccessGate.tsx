import { type FormEvent, type ReactNode, useState } from 'react'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import './App.css'

const ACCESS_KEY = 'dataland-brief-access'
const SITE_PASSWORD = 'BIxMSFT2026!'

export default function AccessGate({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(() => sessionStorage.getItem(ACCESS_KEY) === 'granted')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password !== SITE_PASSWORD) {
      setError('Incorrect password. Check the invitation and try again.')
      return
    }

    sessionStorage.setItem(ACCESS_KEY, 'granted')
    setIsAuthorized(true)
  }

  if (isAuthorized) return children

  return <main className="access-page">
    <header className="access-branding"><img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" /><span className="logo-divider" /><span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span></header>
    <section className="access-panel" aria-labelledby="access-title">
      <LockKeyhole size={32} />
      <p className="eyebrow">DataLand Round 2 briefing</p>
      <h1 id="access-title">Protected workshop</h1>
      <p>Enter the briefing password supplied with your invitation.</p>
      <form onSubmit={submit}>
        <label htmlFor="briefing-password">Password</label>
        <div className="access-input-row"><input id="briefing-password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} autoComplete="current-password" autoFocus aria-invalid={Boolean(error)} aria-describedby={error ? 'access-error' : undefined} /><button type="submit">Open briefing <ArrowRight size={17} /></button></div>
        {error && <p className="access-error" id="access-error" role="alert">{error}</p>}
      </form>
    </section>
  </main>
}