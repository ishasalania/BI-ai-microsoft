type PageId = 'home' | 'workshop' | 'fabric' | 'hosted' | 'protocols'

const pages: { id: PageId; label: string; href: string }[] = [
  { id: 'home', label: 'Home', href: './index.html' },
  { id: 'workshop', label: 'Workshop Prep', href: './workshop.html' },
  { id: 'fabric', label: 'Fabric + Foundry', href: './fabric-foundry.html' },
  { id: 'hosted', label: 'Hosted Agents', href: './hosted-agents.html' },
  { id: 'protocols', label: 'A2A + MCP', href: './protocols.html' },
]

export default function PageNav({ current }: { current: PageId }) {
  return (
    <nav className="site-nav" aria-label="Site pages">
      {pages.map((page) => (
        <a href={page.href} aria-current={page.id === current ? 'page' : undefined} key={page.id}>
          {page.label}
        </a>
      ))}
    </nav>
  )
}