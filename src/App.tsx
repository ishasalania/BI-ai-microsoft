import { useState, type FormEvent } from 'react'
import {
  ArrowRight, Boxes, CalendarDays, Check, CircleAlert, ExternalLink,
  Fingerprint, GitBranch, Route, ShieldCheck,
} from 'lucide-react'
import './App.css'

const workstreams = [
  {
    label: 'Workstream 01 · Core',
    action: 'View governance model',
    title: 'Agent governance platform',
    detail: 'Define how Agent 365, APIM, Entra, source controls and approved runtimes work together across identity, policy and evidence.',
    topics: ['Control plane and registry', 'Interaction and authorization plane', 'Approved runtime contract'],
    href: '#position',
  },
  {
    label: 'Workstream 02 · Day 1',
    action: 'Open Day 1 workstream',
    title: 'Hosted agents and governed data',
    detail: 'Move from the governance position into a Foundry-hosted agent that reaches Databricks under the signed-in user’s source permissions.',
    topics: ['Foundation Labs 1–3', 'Cross-tenant architecture', 'Identity propagation options', 'Production readiness'],
    href: './hosted-agents.html',
  },
  {
    label: 'Workstream 03 · Day 2',
    action: 'Open Day 2 workstream',
    title: 'A2A and MCP interoperability',
    detail: 'Separate agent delegation from tool connectivity, deploy both protocol paths, and close with one combined governed flow.',
    topics: ['A2A versus MCP boundaries', 'APIM gateway controls', 'Combined governed flow', 'Day 2 build sequence'],
    href: './protocols.html',
  },
]

const architectureLayers = [
  ['01', 'Experience and decisions', 'Power BI, Teams, Microsoft 365 Copilot and application experiences surface answers, approvals and human gates where people already work.'],
  ['02', 'Agents and orchestration', 'Microsoft Foundry Agent Service, Copilot Studio and Agent Framework host and coordinate prompt, hosted and specialist agents.'],
  ['03', 'Interaction control', 'APIM mediates model, tool and agent traffic; A2A delegates work between agents; MCP exposes tools and governed source capabilities.'],
  ['04', 'Data and knowledge', 'OneLake, Fabric Data Agent and Azure AI Search augment Snowflake and Databricks. Data stays in its system of record wherever the proof requires zero copy.'],
  ['05', 'Trust and operations', 'Collibra remains the governance source of truth; Purview, OneLake security, Entra, Agent 365, Defender, Azure Monitor and evaluation controls make policy enforceable and auditable.'],
]

const round2Groups = [
  ['01', 'Read data in place', '#1, #2, #7, #27', 'Prove bidirectional Apache Iceberg access, discovery and lineage without a second physical copy.'],
  ['02', 'Enforce every read path', '#3, #4, #8–#11, #28, #29', 'Compare personas across Fabric engines, shares, Snowflake and Databricks; if a rule cannot apply, return no data.'],
  ['03', 'Govern assistant and agent reads', '#21–#24, #30', 'Carry the signed-in user through structured and document retrieval over native and virtualized data.'],
  ['04', 'Author governance once', '#5, #6, #12, #13, #31', 'Mirror Collibra metadata and roles into Purview and OneLake security, then prove they become native enforcing controls.'],
  ['05', 'Operate one marketplace lifecycle', '#14–#19', 'Connect publish, approve, terms, revoke and audit while blocking direct Fabric-side bypass and uncontrolled copies.'],
  ['06', 'Reach external sources through MCP', '#25, #26', 'Read real Snowflake data directly over MCP and preserve per-user OAuth authorization on every client path.'],
]

const agentHypotheses = [
  ['21', 'Conversational analytics', 'Copilot in Power BI', 'Native governed model', 'No row, column or label violation across the fixed 20 questions.'],
  ['22', 'Structured-data agent security', 'Fabric Data Agent', 'Native governed model', 'The agent acts as the user through OBO; a service principal or bypass is an automatic fail.'],
  ['23', 'Document permissions and labels', 'Retrieval agent', 'OneLake-native documents', 'Query-time security trimming blocks restricted content and classification remains with the answer.'],
  ['24', 'Virtualized data chain', 'Copilot and Fabric Data Agent', 'Snowflake Iceberg through OneLake', 'The governed answer succeeds in place with identity intact and no DirectQuery substitution.'],
  ['25', 'External sources through MCP', 'Foundry, Copilot Studio, Teams', 'Snowflake through MCP', 'Each client reads real source data with no OneLake materialization or connection-only evidence.'],
  ['26', 'Per-user identity through MCP', 'OAuth 2.1 on every client path', 'Snowflake source authorization', 'The requesting user reaches the server and a source-side 403 remains a denial with no fallback.'],
]

const accessHash = import.meta.env.VITE_ACCESS_HASH as string | undefined

async function hashPassword(password: string) {
  const encoded = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function App() {
  const [authorized, setAuthorized] = useState(() => !accessHash || sessionStorage.getItem('brief-access') === accessHash)
  const [password, setPassword] = useState('')
  const [accessError, setAccessError] = useState(false)

  async function handleAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const submittedHash = await hashPassword(password)
    if (submittedHash === accessHash) {
      sessionStorage.setItem('brief-access', submittedHash)
      setAuthorized(true)
      setAccessError(false)
      return
    }
    setAccessError(true)
  }

  if (!authorized) {
    return (
      <main className="access-page">
        <div className="access-branding">
          <img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" />
          <span className="logo-divider" />
          <span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span>
        </div>
        <form className="access-panel" onSubmit={handleAccess}>
          <p className="eyebrow">DataLand PoC Round 2</p>
          <h1>Workshop briefing</h1>
          <p>This preparation site is restricted. Enter the workshop access password to continue.</p>
          <label htmlFor="access-password">Password</label>
          <div className="access-input-row">
            <input id="access-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={accessError} autoFocus />
            <button type="submit">Open briefing <ArrowRight size={17} /></button>
          </div>
          {accessError && <p className="access-error" role="alert">That password is not valid.</p>}
        </form>
      </main>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="partner-logos" href="#top" aria-label="Boehringer Ingelheim and Microsoft home">
          <img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" />
          <span className="logo-divider" />
          <span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span>
          <span className="partner-label">Med Data, AI &amp; Systems</span>
        </a>
        <nav aria-label="Page sections">
          <a href="#architecture">Architecture</a><a href="#evidence">Evidence map</a><a href="#workstreams">Workstreams</a><a href="#position">Governance</a>
        </nav>
        <span className="date-pill"><CalendarDays size={15} /> 8–10 Sep</span>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Barcelona · governance architecture · round 2</p>
            <h1>Govern every agent.<br /><span>Prove every identity.</span></h1>
            <p className="lede">The integrated Round 2 position for a DataLand and Microsoft ecosystem: read data in place, preserve source authorization, govern every agent interaction, and retain evidence from request to decision.</p>
            <div className="hero-actions">
              <a className="button primary" href="#evidence">Open the Round 2 evidence map <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Governance layers diagram">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="control-node center-node"><ShieldCheck size={29} /><strong>Governance</strong><span>policy · identity · evidence</span></div>
            <div className="control-node node-a"><Boxes size={20} /><strong>Agent 365</strong><span>fleet<br />visibility</span></div>
            <div className="control-node node-b"><Route size={20} /><strong>APIM</strong><span>runtime<br />control</span></div>
            <div className="control-node node-c"><Fingerprint size={20} /><strong>Entra</strong><span>user<br />context</span></div>
          </div>
        </section>

        <section className="fact-strip" aria-label="Briefing facts">
          <div><span>Round 2 scope</span><strong>Six evidence groups</strong></div>
          <div><span>Critical proof</span><strong>#22 · zero bypass</strong></div>
          <div><span>Agentic scope</span><strong>Hypotheses 21 through 26</strong></div>
          <div><span>Strategy</span><strong>Coexist, do not replace</strong></div>
        </section>

        <section className="section brief-overview" id="overview">
          <div className="brief-overview-heading">
            <div><p className="eyebrow">Executive position</p><h2>One ecosystem. Data stays governed where it lives.</h2></div>
            <p>Microsoft services augment DataLand rather than replace it. Snowflake remains a system of record, Collibra remains the governance source of truth, and Microsoft adds interoperable analytics, agents, runtime controls and audit.</p>
          </div>
          <div className="brief-overview-rows">
            <article><span>01</span><h3>Why Round 2</h3><p>Round 1 assessed native capability. Round 2 tests interoperability: whether data can be discovered, read and governed across foundations without copying or weakening controls.</p></article>
            <article><span>02</span><h3>Architecture rule</h3><p>Define governance once, enforce at every interaction, execute in an approved runtime, and leave final data authorization with the system that owns the source.</p></article>
            <article><span>03</span><h3>Evidence rule</h3><p>Documentation is not a pass. Each claim needs a named path, persona, live test, source-side decision, trace and repeatable expected result.</p></article>
          </div>
        </section>

        <section className="section integrated-architecture" id="architecture">
          <div className="architecture-heading"><div><p className="eyebrow">Integrated target state</p><h2>DataLand foundation. Microsoft intelligence and control.</h2></div><p>The platform is deliberately layered. Experience and runtime can evolve without moving the system of record or rewriting the authorization contract.</p></div>
          <div className="architecture-stack">{architectureLayers.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
          <div className="architecture-principle"><GitBranch size={21} /><p><strong>Coexistence is the default:</strong> start from Snowflake Gold and governed external data, use OneLake shortcuts or open formats only where the zero-copy preconditions hold, and introduce copying only as an explicit architecture decision.</p></div>
        </section>

        <section className="section evidence-map" id="evidence">
          <div className="evidence-heading"><div><p className="eyebrow">Complete Round 2 scope</p><h2>One PoC. Six connected evidence groups.</h2></div><p>The test order follows the dependency chain: read in place, enforce access, govern assistants, synchronize governance, operate the marketplace, then prove direct agent-to-source access.</p></div>
          <div className="evidence-group-list">{round2Groups.map(([number, title, hypotheses, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><strong>{hypotheses}</strong><p>{detail}</p></article>)}</div>
        </section>

        <section className="section agent-proof-map" id="agent-hypotheses">
          <div className="evidence-heading"><div><p className="eyebrow">Agent focus · hypotheses 21–26</p><h2>Every hypothesis has a surface, data path and proof.</h2></div><p>This is the agent-specific slice of Round 2. Open any row for its scored definition, then use the workstream pages for architecture and implementation detail.</p></div>
          <div className="hypothesis-map" role="table" aria-label="Agent hypothesis evidence map">
            <div className="hypothesis-map-head" role="row"><span>Hypothesis</span><span>Test surface</span><span>Governed data path</span><span>Pass evidence</span></div>
            {agentHypotheses.map(([number, title, surface, dataPath, proof]) => <a href={`./workshop.html#hypothesis-${number}`} role="row" key={number}><span><strong>#{number}</strong><small>{title}</small></span><span>{surface}</span><span>{dataPath}</span><span>{proof}<ArrowRight size={15} /></span></a>)}
          </div>
        </section>

        <section className="section agenda-overview" id="workstreams">
          <div className="agenda-overview-heading">
            <div><p className="eyebrow">From evidence to execution</p><h2>One governance position. Three focused workstreams.</h2></div>
            <p>The evidence map defines what must be true. These workstreams define how to build, govern and operate the agent-specific portion of that proof.</p>
          </div>
          <div className="agenda-overview-grid">
            {workstreams.map((item) => <a href={item.href} key={item.label}>
              <span className="agenda-day-label"><CalendarDays size={16} />{item.label}</span>
              <h3>{item.title}</h3><p>{item.detail}</p>
              <small className="section-list-label">Sections inside</small>
              <ol>{item.topics.map((topic, index) => <li key={topic}><span>{String(index + 1).padStart(2, '0')}</span>{topic}</li>)}</ol>
              <strong>{item.action} <ArrowRight size={16} /></strong>
            </a>)}
          </div>
          <div className="supporting-pages" aria-label="Supporting pages">
            <span>Supporting pages</span>
            <a href="./workshop.html"><strong>Workshop Prep</strong><small>Hypotheses, maturity, and twelve decisions</small><ArrowRight size={16} /></a>
            <a href="./fabric-foundry.html"><strong>Fabric + Foundry Scenario</strong><small>Iceberg, labels, OneLake, and source authorization</small><ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="section position" id="position">
          <div className="section-heading">
            <p className="eyebrow">Enterprise governance model</p>
            <h2>Define trust. Enforce interactions. Execute under contract.</h2>
            <p>Governance stays consistent when policy definition, live enforcement and workload execution have clear owners. Telemetry, evidence and revocation span all three planes.</p>
          </div>
          <div className="governance-plane-grid">
            <a className="plane-card" href="https://learn.microsoft.com/en-us/microsoft-agent-365/overview" target="_blank" rel="noreferrer">
              <div className="card-top"><span className="icon-box"><Boxes /></span><span className="status">Define</span></div>
              <p className="kicker">Control plane</p><h3>Agent 365 + Foundry</h3>
              <p>Register governed capabilities and define trust before runtime.</p>
              <ul><li><Check /> Record purpose, owner, identity and scope</li><li><Check /> Declare tools, APIs and data dependencies</li><li><Check /> Track risk, version, evidence and lifecycle</li><li><CircleAlert /> Make revocation and exceptions explicit</li></ul>
              <strong className="card-link">Open Agent 365 overview <ExternalLink size={14} /></strong>
            </a>
            <a className="plane-card apim-card" href="https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities" target="_blank" rel="noreferrer">
              <div className="card-top"><span className="icon-box"><Route /></span><span className="status">Enforce</span></div>
              <p className="kicker">Interaction plane</p><h3>APIM + source systems</h3>
              <p>Evaluate each model, agent, tool and data interaction in context.</p>
              <ul><li><Check /> Authenticate agent and requesting user</li><li><Check /> Apply safety, scope, rate and cost policies</li><li><Check /> Preserve delegated identity downstream</li><li><Check /> Keep RLS, CLS and denials at the source</li></ul>
              <strong className="card-link">Open APIM AI gateway <ExternalLink size={14} /></strong>
            </a>
            <a className="plane-card runtime-card" href="./hosted-agents.html">
              <div className="card-top"><span className="icon-box"><ShieldCheck /></span><span className="status">Execute</span></div>
              <p className="kicker">Runtime plane</p><h3>Approved agent runtimes</h3>
              <p>Run agents close to their domain while inheriting shared governance contracts.</p>
              <ul><li><Check /> Isolate sessions, secrets and network access</li><li><Check /> Keep deployment configuration portable</li><li><Check /> Trace agents, tools, data and policy results</li><li><Check /> Gate releases with evaluation and rollback</li></ul>
              <strong className="card-link">Open hosted runtime design <ArrowRight size={14} /></strong>
            </a>
          </div>
          <div className="position-line"><GitBranch size={22} /><p><strong>Operating model:</strong> centralize identity, policy, registry and evidence by default; allow domain execution by exception only when it remains observable, reversible and connected to the same interaction controls.</p></div>
        </section>

        <section className="closing"><ShieldCheck size={24} /><div><p className="eyebrow">Governance standard</p><blockquote>Every agent is known, constrained, attributable, and authorized all the way to the data.</blockquote></div></section>
      </main>
      <footer><span>DataLand · Round 2 preparation</span><span>Architecture position · September 2026</span></footer>
    </div>
  )
}

export default App