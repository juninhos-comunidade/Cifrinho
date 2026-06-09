import type { FastifyInstance } from 'fastify'

type FeatureStatus = 'planned' | 'in_progress' | 'done'

interface GitHubIssue {
  number: number
  title: string
  body: string | null
  state: 'open' | 'closed'
  assignees: { login: string }[]
  labels: { name: string }[]
  html_url: string
}

interface Feature {
  id: number
  name: string
  detail: string
  area: string[]
  status: FeatureStatus
  github_url: string
}

interface RoadmapCache {
  data: ReturnType<typeof buildPayload>
  fetchedAt: number
}

const AREA_LABELS = new Set(['Front-end', 'Back-end', 'API', 'UI/UX', 'QA'])
const CACHE_TTL_MS = 5 * 60 * 1000

let cache: RoadmapCache | null = null

function classifyIssue(issue: GitHubIssue): FeatureStatus {
  if (issue.state === 'closed') return 'done'
  if (issue.assignees.length > 0) return 'in_progress'
  return 'planned'
}

function buildPayload(issues: GitHubIssue[]) {
  const features: Feature[] = issues
    .filter(i => i.labels.some(l => l.name === 'feature'))
    .map(i => ({
      id:         i.number,
      name:       i.title,
      detail:     (i.body ?? '').replace(/[#*_`\[\]]/g, '').trim().slice(0, 100) || i.title,
      area:       i.labels.map(l => l.name).filter(n => AREA_LABELS.has(n)),
      status:     classifyIssue(i),
      github_url: i.html_url,
    }))

  const planned     = features.filter(f => f.status === 'planned')
  const in_progress = features.filter(f => f.status === 'in_progress')
  const done        = features.filter(f => f.status === 'done')
  const total       = features.length
  const pct         = total > 0 ? Math.round((done.length / total) * 100) : 0

  return { planned, in_progress, done, meta: { total, done_count: done.length, pct } }
}

export async function roadmapRoutes(app: FastifyInstance) {
  app.get('/roadmap', async (_req, reply) => {
    const now = Date.now()

    if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
      return reply.header('X-Cache', 'HIT').send(cache.data)
    }

    const owner = process.env.GITHUB_REPO_OWNER
    const repo  = process.env.GITHUB_REPO_NAME
    const token = process.env.GITHUB_TOKEN

    if (!owner || !repo) {
      // fallback para o repositório padrão da organização
      return reply.status(503).send({ message: 'GITHUB_REPO_OWNER e GITHUB_REPO_NAME não configurados. Defina GITHUB_REPO_OWNER=juninhos-comunidade e GITHUB_REPO_NAME=Cifrinho no .env.' })
    }

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (token) headers.Authorization = `Bearer ${token}`

    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100&labels=feature`

    let issues: GitHubIssue[]
    try {
      const res = await fetch(url, { headers })
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      issues = await res.json() as GitHubIssue[]
    } catch (err) {
      app.log.error(err)
      // retorna cache velho se existir, ao invés de falhar completamente
      if (cache) return reply.header('X-Cache', 'STALE').send(cache.data)
      return reply.status(503).send({ message: 'Não foi possível buscar dados do repositório.' })
    }

    const data = buildPayload(issues)
    cache = { data, fetchedAt: now }

    return reply.header('X-Cache', 'MISS').send(data)
  })
}
