import { useState, type FormEvent } from 'react'
import {
  ArrowRight, BadgeCheck, BookOpen, Boxes, CalendarDays, Check, ChevronDown,
  CircleAlert, ExternalLink, Fingerprint, GitBranch, KeyRound, LockKeyhole,
  Route, ShieldCheck, Users, MapPin, Database,
} from 'lucide-react'
import './App.css'

const sources = [
  ['Purview label indexing', 'https://learn.microsoft.com/en-us/azure/search/search-indexer-sensitivity-labels'],
  ['Query-time enforcement', 'https://learn.microsoft.com/en-us/azure/search/search-query-sensitivity-labels'],
  ['Document-level access control', 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'],
  ['Foundry Azure AI Search tool', 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/ai-search'],
]

const releaseReadiness = [
  {
    name: 'Fabric Data Agent',
    status: 'GA',
    hypotheses: '#22',
    claim: 'The core Fabric Data Agent is generally available and uses the requesting user’s credentials. RLS and CLS on Power BI semantic models still apply.',
    caveat: 'Some Purview governance controls for agent interactions and Fabric access restriction policies remain preview.',
    href: 'https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent',
  },
  {
    name: 'Copilot in Power BI',
    status: 'Mixed',
    hypotheses: '#21, #24',
    claim: 'The report-scoped Copilot pane is generally available.',
    caveat: 'Standalone Copilot and app-scoped Copilot are preview. Use the report pane for a GA-aligned #21 test surface.',
    href: 'https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction',
  },
  {
    name: 'Snowflake DirectQuery and Entra SSO',
    status: 'GA',
    hypotheses: '#21, #22, #24',
    claim: 'The Snowflake connector is generally available. DirectQuery and Microsoft Entra authentication are supported.',
    caveat: 'Microsoft Entra SSO only works with DirectQuery. Import mode does not preserve the end user’s source identity.',
    href: 'https://learn.microsoft.com/en-us/power-query/connectors/snowflake',
  },
  {
    name: 'Purview labels in Azure AI Search',
    status: 'Preview',
    hypotheses: '#23',
    claim: 'Sensitivity label extraction and query-time policy enforcement are available through preview REST APIs.',
    caveat: 'No production SLA. It requires a system-assigned managed identity, privileged Purview roles, RBAC queries, and same-tenant users.',
    href: 'https://learn.microsoft.com/en-us/azure/search/search-indexer-sensitivity-labels',
  },
  {
    name: 'Foundry MCP and OAuth passthrough',
    status: 'Verify',
    hypotheses: '#25, #26',
    claim: 'Current Foundry documentation supports remote MCP, OAuth identity passthrough, user Entra tokens, and server-side authorization.',
    caveat: 'Do not convert documentation into a pass. Pre-test Snowflake with two users and prove that a server-side 403 remains a denial.',
    href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication',
  },
  {
    name: 'Copilot Studio MCP and OAuth',
    status: 'Verify',
    hypotheses: '#25, #26',
    claim: 'Copilot Studio documents native MCP onboarding with API key or OAuth 2.0 authentication and per-user consent.',
    caveat: 'The workbook requires parity with Foundry. Validate the actual Snowflake server, transport, scopes, denial path, and tenant rollout.',
    href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent',
  },
  {
    name: 'Microsoft Agent Framework',
    status: 'Mixed',
    hypotheses: '#25, #26',
    claim: 'The framework is documented for Python, .NET, and Go and integrates with Foundry hosted agents.',
    caveat: 'Maturity varies by language and package. The Foundry .NET package uses prerelease installation, and Go is explicitly public preview. It does not deploy to Copilot Studio.',
    href: 'https://learn.microsoft.com/en-us/agent-framework/overview/',
  },
  {
    name: 'APIM AI gateway',
    status: 'Mixed',
    hypotheses: 'Governance layer',
    claim: 'Core APIM gateway controls cover authentication, quotas, routing, monitoring, model APIs, and MCP traffic.',
    caveat: 'The AI gateway experience inside Foundry and the unified model API are preview. Evaluate each policy and tier, not the umbrella name.',
    href: 'https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities',
  },
  {
    name: 'Agent 365',
    status: 'Frontier',
    hypotheses: 'Design discussion only',
    claim: 'Treat Agent 365 as the management-plane architecture discussion requested by the customer, not as one of the 27 scored hypotheses.',
    caveat: 'Public Foundry documentation states that Agent 365 MCP servers are limited to Frontier tenants. Confirm tenant entitlement and exact registry depth before making availability claims.',
    href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication',
  },
]

const tests = [
  { id: 21, title: 'Conversational analytics enforcement', state: 'Prove', surface: 'Copilot in Power BI · signed-in user', evidence: 'R1 inconclusive · achievable natively', note: 'Zero row, column or label violations across 20 fixed questions. This is the deliberate control for #24.', offering: 'Power BI Copilot over the governed semantic model, with DirectQuery and Snowflake SSO where identity must reach the source. Import mode is not the answer.' },
  { id: 22, title: 'Structured-data agent security', state: 'Critical', surface: 'Fabric Data Agent · governed semantic model', evidence: 'R1 failed · Microsoft challenges the result', note: 'Zero bypass. Entra OBO is mandatory; a service principal is an automatic fail. Attempt Snowflake direct, not Databricks.', offering: 'Fabric Data Agent constrained to Fabric-mediated tools, backed by a governed semantic model and Snowflake DirectQuery SSO. Prove user context before the demo starts.' },
  { id: 23, title: 'Document permissions and labels', state: 'Prove', surface: 'OneLake / SharePoint · Azure AI Search', evidence: 'R1 inconclusive · achievable natively', note: 'Zero unauthorized disclosure. Security trimming must happen at query time under delegated Entra identity.', offering: 'Purview-enabled Azure AI Search with query-time label enforcement and delegated Entra tokens. Use Copilot Studio or Foundry only when the end-user token reaches Search.' },
  { id: 24, title: 'Full chain over virtualized data', state: 'Resolve', surface: 'Snowflake DirectQuery · SSO', evidence: 'Architecture conflict to resolve', note: 'Run the same 20 questions as #21. If #21 passes and this fails, virtualization is the fault line.', offering: 'Fabric semantic model with Snowflake DirectQuery and SSO, consumed by Power BI Copilot or Fabric Data Agent. OneLake shortcuts cannot enforce source identity end to end.' },
  { id: 25, title: 'External sources through MCP', state: 'Resolve', surface: 'Copilot Studio + AI Foundry · real source', evidence: 'Microsoft and customer scope conflict', note: 'Must read real Snowflake data without OneLake materialization. A connection walkthrough does not test the hypothesis.', offering: 'Native MCP connectivity in both Copilot Studio and Foundry, tested against the live Snowflake MCP server. Microsoft Agent Framework is the pro-code Foundry-only extension path.' },
  { id: 26, title: 'Per-user identity through MCP', state: 'Pre-test', surface: 'OAuth 2.1 / OBO · server-side denial', evidence: 'Mandatory pre-test · both agent surfaces', note: 'Validate token pass-through in both surfaces. Entra sign-in alone does not prove that the user token reached the server.', offering: 'Entra OBO and OAuth 2.1 token forwarding through Copilot Studio and Foundry. A server-side 403 must be returned unchanged, with no framework bypass.' },
]

const accessHash = import.meta.env.VITE_ACCESS_HASH as string | undefined

async function hashPassword(password: string) {
  const encoded = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function App() {
  const [expanded, setExpanded] = useState(true)
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
          <a href="#workshop">Workshop</a><a href="#position">Position</a><a href="#security">Security proof</a>
          <a href="#readiness">GA vs preview</a><a href="#tests">Tests 21–26</a><a href="./workshop.html">Workshop prep</a>
        </nav>
        <span className="date-pill"><CalendarDays size={15} /> 8–10 Sep</span>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Barcelona · architecture position · round 2</p>
            <h1>Govern every agent.<br /><span>Prove every identity.</span></h1>
            <p className="lede">A design-discussion brief for governing agents across Microsoft and third-party estates, with APIM at runtime and Agent 365 as the management conversation.</p>
            <div className="hero-actions">
              <a className="button primary" href="#position">Open the position <ArrowRight size={17} /></a>
              <a className="button secondary" href="./workshop.html">Open workshop prep</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Governance layers diagram">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="control-node center-node"><ShieldCheck size={29} /><strong>Governance</strong><span>policy · identity · evidence</span></div>
            <div className="control-node node-a"><Boxes size={20} /><strong>Agent 365</strong><span>fleet visibility</span></div>
            <div className="control-node node-b"><Route size={20} /><strong>APIM</strong><span>runtime control</span></div>
            <div className="control-node node-c"><Fingerprint size={20} /><strong>Entra</strong><span>user context</span></div>
          </div>
        </section>

        <section className="fact-strip" aria-label="Briefing facts">
          <div><span>Agent 365 status</span><strong>Outside the 27 hypotheses</strong></div>
          <div><span>Critical proof</span><strong>#22 · zero bypass</strong></div>
          <div><span>Agentic scope</span><strong>Hypotheses 21 through 26</strong></div>
          <div><span>Non-negotiable</span><strong>No service principal</strong></div>
        </section>

        <section className="section round-context" id="context">
          <div className="context-copy">
            <p className="eyebrow">Why Round 2 exists</p>
            <h2>Capability was not enough. This round must produce evidence.</h2>
            <p>Round 1 called Azure capable and well-integrated, but it did not produce an investment case. Boehringer is augmenting DataLand with Microsoft, not replacing it. The bar remains simple: no user sees data they are not permitted to see.</p>
          </div>
          <div className="scoreboard" aria-label="Round 1 outcome summary">
            <article><strong>40%</strong><span>of 93 must-haves passed</span></article>
            <article><strong>26%</strong><span>were inconclusive</span></article>
            <article><strong>19%</strong><span>failed</span></article>
            <article><strong>10</strong><span>must-haves were preview-only</span></article>
          </div>
          <div className="north-star">
            <span>Business north star</span>
            <p><strong>Increase probability of success in R&amp;D.</strong> Dataland must support iterative learning cycles across a 12 to 15 year development journey, while protecting the investment case and every governed boundary.</p>
            <span className="decision-badge">No investment case today</span>
          </div>
        </section>

        <section className="section workshop" id="workshop">
          <div className="workshop-intro">
            <div>
              <p className="eyebrow">What room are we in?</p>
              <h2>Agentic content is being pulled into a Data Foundation week.</h2>
            </div>
            <p>Workshop 1 in Spain is the Data Foundation deep dive. The scored analytics, data science and agentic sessions belong to Workshop 2 in Ingelheim. The customer has pulled the governance conversation forward, explicitly as a design discussion.</p>
          </div>
          <div className="workshop-grid">
            <article><span className="context-icon"><MapPin /></span><p className="kicker">Barcelona · 8–10 Sep</p><h3>Workshop 1</h3><p>Data Foundation deep dive. Use the week to settle architecture, surfaces, identity flows and evidence readiness.</p></article>
            <article><span className="context-icon"><Users /></span><p className="kicker">AI and agent focus</p><h3>Hypotheses 21–26</h3><p>Conversational analytics, structured-data agents, document permissions, virtualization, MCP connectivity and per-user identity.</p></article>
            <article><span className="context-icon"><CalendarDays /></span><p className="kicker">Ingelheim · Workshop 2</p><h3>Scored agentic sessions</h3><p>Use the Barcelona design discussion to align the architecture and prepare reproducible evidence for the scored sessions.</p></article>
          </div>
        </section>

        <section className="section position" id="position">
          <div className="section-heading">
            <p className="eyebrow">The architecture position</p>
            <h2>One governance story, two distinct control planes</h2>
            <p>Do not present Agent 365 as a scored product demo. Use the discussion to define how management-time oversight and runtime enforcement work together.</p>
          </div>
          <div className="plane-grid">
            <article className="plane-card">
              <div className="card-top"><span className="icon-box"><Boxes /></span><span className="status">Design discussion</span></div>
              <p className="kicker">Management plane</p><h3>Agent 365</h3>
              <p>Inventory, lifecycle, ownership and governance signals across the agent estate.</p>
              <ul><li><Check /> Discover Microsoft-managed agents</li><li><Check /> Establish owners and lifecycle state</li><li><Check /> Discuss Graph API and Agent SDK depth</li><li><CircleAlert /> Test visibility limits for AWS and external agents</li></ul>
            </article>
            <div className="plus" aria-hidden="true">+</div>
            <article className="plane-card apim-card">
              <div className="card-top"><span className="icon-box"><Route /></span><span className="status">Runtime enforcement</span></div>
              <p className="kicker">Traffic plane</p><h3>Azure API Management</h3>
              <p>Put enforceable controls on model, MCP and tool traffic at the point of use.</p>
              <ul><li><Check /> Authenticate agent and caller identity</li><li><Check /> Apply token, rate and cost limits</li><li><Check /> Route models and balance backends</li><li><Check /> Log policy decisions for audit</li></ul>
            </article>
          </div>
          <div className="position-line"><GitBranch size={22} /><p><strong>Position to take:</strong> Agent 365 answers “what agents exist and who owns them?” APIM answers “what may this agent call, under whose identity, and under which policy?” Neither replaces end-to-end authorization at the data source.</p></div>
          <div className="governance-questions">
            <div className="question-heading"><p className="eyebrow">Questions to resolve in the room</p><h3>The honest boundary matters more than the marketing surface.</h3></div>
            <article><span>01</span><h4>How far does registry reach?</h4><p>For agents outside Microsoft, does sync expose names only or full posture, ownership and lifecycle state?</p></article>
            <article><span>02</span><h4>SDK or direct Graph API?</h4><p>Clarify the roles of Agent SDK and Graph calls for registration, inventory, revocation and richer metadata.</p></article>
            <article><span>03</span><h4>How does ServiceNow coexist?</h4><p>Define system of record, cross-system workflow and handoff boundaries rather than presenting a replacement story.</p></article>
          </div>
        </section>

        <section className="section security" id="security">
          <div className="section-heading light">
            <p className="eyebrow">The security proof</p>
            <h2>“Highly Confidential” can be indexed.<br />Retrieval still belongs to the user.</h2>
            <p>Azure AI Search support for Purview sensitivity labels is in preview. The architecture is valid only when the user’s delegated identity reaches query-time enforcement.</p>
          </div>
          <div className="security-grid">
            <article className="security-card"><span className="step">01</span><LockKeyhole /><h3>Index with Purview enabled</h3><p>Use Blob Storage, ADLS Gen2, SharePoint or OneLake and create the index with <code>purviewEnabled: true</code>.</p><span className="preview-tag">REST 2026-08-01-preview</span></article>
            <article className="security-card"><span className="step">02</span><KeyRound /><h3>Grant extraction rights</h3><p>The Search system-assigned managed identity needs <code>Content.SuperUser</code> and <code>UnifiedPolicy.Tenant.Read</code>.</p></article>
            <article className="security-card accent-card"><span className="step">03</span><Fingerprint /><h3>Forward the user token</h3><p>Search RBAC and Purview label rights must both pass. Use delegated Entra identity and OBO, not a shared application identity.</p></article>
          </div>
          <div className="outcome-panel">
            <div className="outcome-intro"><span className="icon-box"><BadgeCheck /></span><div><p className="kicker">Query outcomes</p><h3>Identity decides the result set</h3></div></div>
            <div className="outcome-table" role="table" aria-label="Search authorization outcomes">
              <div className="table-row table-head" role="row"><span>Request context</span><span>Result</span></div>
              <div className="table-row" role="row"><span>Authorized user token + label permission</span><strong className="allow">Document returned</strong></div>
              <div className="table-row" role="row"><span>User lacks label permission</span><strong>Document excluded</strong></div>
              <div className="table-row" role="row"><span>No user token supplied</span><strong>Only unlabeled documents</strong></div>
              <div className="table-row" role="row"><span>Elevated administrative read</span><strong>Returned + audited</strong></div>
            </div>
          </div>
          <div className="warning"><CircleAlert /><p><strong>The failure mode:</strong> a standard Foundry Search connection normally uses the project managed identity or an API key. The project identity grants application access; it does not represent the end user. Without OBO or label-aware Foundry IQ retrieval, labeled documents are omitted. If decrypted content is copied into an ordinary index, the original Purview label no longer protects that copy.</p></div>
          <div className="source-list"><span>Microsoft sources</span>{sources.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={href}>{label}<ExternalLink size={14} /></a>)}</div>
        </section>

        <section className="section readiness" id="readiness">
          <div className="readiness-heading">
            <div>
              <p className="eyebrow">Release readiness · checked 2 Sep 2026</p>
              <h2>GA is not inherited by every feature inside a product.</h2>
            </div>
            <div className="status-definitions">
              <p><span className="readiness-dot dot-ga" /><strong>GA</strong> Supported production capability.</p>
              <p><span className="readiness-dot dot-preview" /><strong>Preview</strong> No production SLA; behavior can change.</p>
              <p><span className="readiness-dot dot-mixed" /><strong>Mixed</strong> GA core with preview subfeatures.</p>
              <p><span className="readiness-dot dot-verify" /><strong>Verify</strong> Documented, but the exact PoC path still needs proof.</p>
            </div>
          </div>
          <div className="readiness-rule">
            <ShieldCheck />
            <p><strong>Customer-safe rule:</strong> classify the exact surface, identity flow, connector, API version, and policy used in the test. Never describe a preview enforcement feature as GA because the parent product is GA.</p>
          </div>
          <div className="readiness-table" role="table" aria-label="Microsoft capability release readiness">
            <div className="readiness-row readiness-header" role="row"><span>Capability</span><span>Status</span><span>What we can say</span><span>Boundary for the PoC</span></div>
            {releaseReadiness.map((item) => (
              <a className="readiness-row" href={item.href} target="_blank" rel="noreferrer" role="row" key={item.name}>
                <span className="readiness-name"><strong>{item.name}</strong><small>{item.hypotheses}</small></span>
                <span><b className={`release-status release-${item.status.toLowerCase()}`}>{item.status}</b></span>
                <span>{item.claim}</span>
                <span className="readiness-caveat">{item.caveat}<ExternalLink size={13} /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section tests" id="tests">
          <div className="section-heading row-heading">
            <div><p className="eyebrow">Round 2 scored surface</p><h2>Six hypotheses. Identity is the common control.</h2></div>
            <button className="text-button" type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? 'Condense view' : 'Show test detail'} <ChevronDown className={expanded ? 'rotate' : ''} size={17} /></button>
          </div>
          <div className="test-legend"><span>Hypothesis</span><span>Threshold, evidence and Microsoft response</span><span>Status</span></div>
          <div className="test-list">{tests.map((test) => <article className={`test-row ${expanded ? 'expanded' : ''}`} key={test.id}><span className="test-number">#{test.id}</span><div><h3>{test.title}</h3><span className="test-surface">{test.surface}</span><span className="test-evidence">{test.evidence}</span><p>{test.note}</p>{expanded && <div className="offering"><strong>Microsoft position</strong><span>{test.offering}</span></div>}</div><span className={`test-state state-${test.state.toLowerCase()}`}>{test.state}</span></article>)}</div>
          <div className="scope-note"><Database /><p><strong>Databricks has no scored path in Round 2.</strong> Both hypotheses were deferred because Databricks reaches Microsoft data through Snowflake. Treat it as architecture discussion only.</p></div>
        </section>

        <section className="section claims" id="claims">
          <div className="section-heading"><p className="eyebrow">Claim discipline</p><h2>Say what is verified. Flag what is not.</h2><p>Round 1 showed why every conclusion needs an agreed test, source evidence and precise wording. Precision is part of the governance posture.</p></div>
          <div className="claims-grid">
            <article className="claim-confirmed"><span>Confirmed</span><h3>Governance gaps are real</h3><p>Collibra–Purview is “not achievable natively” for #5 and #6. All agentic hypotheses score security, permissions and governance, not answer quality.</p></article>
            <article className="claim-corrected"><span>Corrected</span><h3>Shortcuts do not carry identity</h3><p>For whole-path enforcement, Microsoft’s recorded answer is Snowflake Direct Query with SSO. That conflicts with the zero-copy shortcut architecture.</p></article>
            <article className="claim-unverified"><span>Evidence standard</span><h3>Document the exact path</h3><p>Record the user, surface, connector, token path, source-side authorization decision and result for every claimed pass or failure.</p></article>
          </div>
        </section>

        <section className="section prep-handoff" id="actions">
          <div>
            <p className="eyebrow">Workshop workspace</p>
            <h2>Use the evidence plan live in the room.</h2>
          </div>
          <p>The separate workshop page holds the live decision tracker, proof priorities, and an official Microsoft Foundry hosted-agent repository for the working session.</p>
          <div className="handoff-actions"><a className="button primary" href="./workshop.html">Open workshop prep <ArrowRight size={17} /></a><a className="scenario-link" href="./fabric-foundry.html">View Fabric + Foundry scenario</a></div>
        </section>

        <section className="closing"><BookOpen size={24} /><div><p className="eyebrow">Recommended opening line</p><blockquote>“We are not here to demo another agent. We are here to show how every agent is known, constrained, attributable and authorized all the way to the data.”</blockquote></div></section>
      </main>
      <footer><span>DataLand · Round 2 preparation</span><span>Architecture position · September 2026</span></footer>
    </div>
  )
}

export default App