import { spawnSync } from 'node:child_process'

const pages = [
  'index.html',
  'workshop.html',
  'fabric-foundry.html',
  'hosted-agents.html',
  'protocols.html',
]

for (const [index, page] of pages.entries()) {
  const result = spawnSync('npx', ['vite', 'build'], {
    env: {
      ...process.env,
      BUILD_PAGE: page,
      BUILD_CLEAN: String(index === 0),
    },
    stdio: 'inherit',
  })

  if (result.status !== 0) process.exit(result.status ?? 1)
}