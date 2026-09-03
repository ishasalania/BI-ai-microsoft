import { ArrowUpRight, CalendarDays, Check, ExternalLink, GitBranch, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import PageNav from './PageNav'

const priorities = [
  ['01', 'Identity first', 'Prove OAuth and OBO with two users before any scored MCP demonstration.'],
  ['02', 'Real source', 'Read live Snowflake data. A connection walkthrough is not evidence for #25.'],
  ['03', 'Denial survives', 'A server-side 403 must remain a denial through every agent and framework layer.'],
  ['04', 'Same question set', 'Use the fixed 20 questions across #21 and #24 so the virtualization effect is visible.'],
]

const hypotheses = [
  ['21', 'Conversational analytics', 'Prove', 'Use the signed-in user and the fixed 20-question set. Zero row, column, or label violations.', 'https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-privacy-security'],
  ['22', 'Structured-data agent security', 'Critical', 'Fabric Data Agent must preserve user identity. Any service-principal or direct-source bypass is a fail.', 'https://learn.microsoft.com/en-us/fabric/data-science/data-agent-sharing'],
  ['23', 'Document permissions and labels', 'Prove', 'Security trimming must occur at query time and sensitivity context must remain with the answer.', 'https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview'],
  ['24', 'Virtualized data chain', 'Resolve', 'Test the Apache Iceberg zero-copy path. DirectQuery is a fallback, not evidence for this hypothesis.', 'https://learn.microsoft.com/en-us/fabric/onelake/onelake-shortcuts'],
  ['25', 'External sources through MCP', 'Resolve', 'Both Foundry and Copilot Studio must read the real Snowflake source rather than a connection walkthrough.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol'],
  ['26', 'Per-user identity through MCP', 'Pre-test', 'Prove OAuth/OBO in every client path and preserve a source-side 403 without fallback.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication'],
]

const readiness = [
  ['GA', 'Fabric Data Agent core; Snowflake connector and DirectQuery with Entra SSO.'],
  ['Mixed', 'Copilot in Power BI, Agent Framework, and APIM AI gateway depend on the exact surface or subfeature.'],
  ['Preview', 'Purview sensitivity-label extraction and query-time enforcement in Azure AI Search.'],
  ['Verify', 'Foundry and Copilot Studio MCP identity passthrough against the actual customer path.'],
]

const actions = [
  ['Pre-test token pass-through', 'Prove OAuth 2.1 and OBO in Copilot Studio and Foundry. If identity cannot pass, #26 fails regardless of the MCP server.'],
  ['Validate the zero-bypass condition', 'Confirm Fabric Data Agent runs as the signed-in user, then attempt direct-to-Snowflake bypass. Do not substitute Databricks.'],
  ['Resolve shortcuts versus SSO', 'Resolve the #24 architecture choice. Shortcuts do not enforce source identity end to end; Snowflake DirectQuery with SSO changes the zero-copy story.'],
  ['Agree the MCP evidence', 'Settle whether #25 includes real Snowflake data. Record the source query, caller identity, response, and denial behavior.'],
  ['Name the extraction path', 'Document how docx, pptx, odt, and scanned files are extracted. Settle OneLake versus labelled SharePoint for #23.'],
  ['Define the Agent 365 scope', 'Cover non-Microsoft registry depth, Agent SDK versus Graph API, tenant entitlement, and coexistence with ServiceNow.'],
  ['Confirm SETUP-0', 'Name the Fabric capacity, SKU, licences, tenant owner, tenant lifetime, participant accounts, and Entra federation.'],
  ['Confirm the 20-question set', 'SETUP-A must exist before the run. Three of the six hypotheses depend on it and cannot be scored without it.'],
  ['Choose the identity propagation path', 'Document User Entra Token through Foundry Toolbox versus OAuth identity passthrough, including audience, scopes, consent, hosted-agent support and the downstream authorization owner.'],
  ['Prove cross-tenant guest access', 'Invite both test identities into the data tenant where required, assign minimum data entitlements, obtain tenant-correct tokens and prove that a Tenant 1 token is never reused as a Tenant 2 credential.'],
  ['Test session isolation', 'Run concurrent User A and User B sessions and prove that files, memory, tool outputs and credentials cannot cross the documented per-session VM-isolated sandbox boundary.'],
  ['Set production quality gates', 'Name owners and thresholds for authorization failures, content safety, quality evaluations, latency, cost, drift, retention and rollback after prompts, tools, models or policies change.'],
]

export default function WorkshopPage() {
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1))
    if (!target) return

    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    target.scrollIntoView()
    document.documentElement.style.scrollBehavior = previousScrollBehavior
  }, [])

  function toggleAction(index: number) {
    setCompleted((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  }

  return (
    <div className="workshop-page">
      <header className="topbar workshop-topbar">
        <a className="partner-logos" href="./index.html" aria-label="Return to the main briefing">
          <img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" />
          <span className="logo-divider" />
          <span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span>
        </a>
        <PageNav current="workshop" />
        <span className="date-pill"><CalendarDays size={15} /> 8–10 Sep</span>
      </header>

      <main>
        <section className="prep-hero">
          <div className="prep-hero-copy">
            <p className="eyebrow">Barcelona · workshop preparation</p>
            <h1>Settle the architecture.<br /><span>Then prove it.</span></h1>
            <p>The solution combines Microsoft Fabric and OneLake governed access with Foundry agents, APIM, A2A and MCP, while Entra preserves the requesting user and each source retains final authorization. This page turns that architecture into the decisions, setup and evidence required to score hypotheses 21–26.</p>
          </div>
          <div className="prep-hero-meta">
            <div><span>Scope</span><strong>Hypotheses 21–26</strong></div>
            <div><span>Critical proof</span><strong>#22 · zero bypass</strong></div>
            <div><span>Required setup</span><strong>SETUP-0 + SETUP-A</strong></div>
            <div><span>Evidence rule</span><strong>Identity at the source</strong></div>
          </div>
        </section>

        <section className="section prep-priorities">
          <div><p className="eyebrow">01 · Proof priorities</p><h2>Four prerequisites for valid evidence.</h2></div>
          <div className="priority-list">{priorities.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
        </section>

        <section className="section prep-hypotheses" id="hypotheses">
          <div className="prep-plan-heading"><div><p className="eyebrow">02 · Scored scope</p><h2>Six hypotheses. One identity standard.</h2></div><p>Each pass needs a named user, the exact surface and connector, a source-side authorization decision, and reproducible evidence.</p></div>
          <div className="hypothesis-source-note"><ShieldCheck size={20} /><p><strong>Documentation supports the mechanism, not the pass.</strong> Each link establishes official capability, prerequisites or limitations. Only the named-user live test and captured source-side decision can pass a hypothesis.</p></div>
          <div className="prep-hypothesis-grid">{hypotheses.map(([number, title, state, detail, source]) => <article id={`hypothesis-${number}`} key={number}><span>#{number}</span><div><h3>{title}</h3><p>{detail}</p><a className="hypothesis-source-link" href={source} target="_blank" rel="noreferrer">Official documentation <ExternalLink size={14} /></a></div><strong>{state}</strong></article>)}</div>
        </section>

        <section className="section prep-readiness">
          <div className="prep-plan-heading"><div><p className="eyebrow">03 · Claim boundary</p><h2>State maturity at the feature level.</h2></div><p>GA is not inherited by every feature inside a product. Classify the exact API, connector, identity flow, and policy used by the proof.</p></div>
          <div className="prep-readiness-grid">{readiness.map(([state, detail]) => <article key={state}><strong>{state}</strong><p>{detail}</p></article>)}</div>
        </section>

        <section className="section prep-plan">
          <div className="prep-plan-heading">
            <div><p className="eyebrow">04 · Evidence plan</p><h2>Twelve decisions before execution.</h2></div>
            <div className="prep-progress"><div><strong>{completed.length} of {actions.length} ready</strong><span>Mark each decision as it is closed.</span></div><span className="progress-track"><span style={{ width: `${completed.length / actions.length * 100}%` }} /></span></div>
          </div>
          <div className="prep-checklist">{actions.map(([title, detail], index) => <article className={completed.includes(index) ? 'is-complete' : ''} key={title}><button type="button" onClick={() => toggleAction(index)} aria-pressed={completed.includes(index)} aria-label={`${completed.includes(index) ? 'Reopen' : 'Complete'} ${title}`}>{completed.includes(index) ? <Check size={17} /> : String(index + 1).padStart(2, '0')}</button><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
        </section>

        <section className="section prep-resources">
          <div className="prep-resource-heading">
            <div><p className="eyebrow">Workshop build resource</p><h2>Start from Microsoft’s hosted-agent samples.</h2></div>
            <p>This is the official Microsoft Foundry sample collection. The Python path includes Agent Framework, LangGraph, bring-your-own frameworks, Responses and Invocations protocols, deployment manifests, and built-in observability.</p>
          </div>
          <a className="repo-card" href="https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents" target="_blank" rel="noreferrer">
            <span className="repo-icon"><GitBranch size={28} /></span>
            <div><h3>microsoft-foundry / foundry-samples</h3><p>Official Python hosted-agent samples for Microsoft Foundry Agent Service.</p></div>
            <span className="repo-detail"><strong>Recommended path</strong>Agent Framework · Responses · Basic</span>
            <span className="repo-open">Open repository <ArrowUpRight size={17} /></span>
          </a>
          <div className="resource-links">
            <a href="./fabric-foundry.html">OneLake + Foundry test scenario <ArrowUpRight size={14} /></a>
            <a href="https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents/agent-framework/responses/01-basic" target="_blank" rel="noreferrer">Basic Python agent <ExternalLink size={14} /></a>
            <a href="https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent" target="_blank" rel="noreferrer">Hosted-agent quickstart <ExternalLink size={14} /></a>
            <a href="https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/csharp/hosted-agents" target="_blank" rel="noreferrer">Official .NET samples <ExternalLink size={14} /></a>
          </div>
        </section>

        <section className="closing"><ShieldCheck size={24} /><div><p className="eyebrow">Exit criterion</p><blockquote>Every claimed pass has a named user, a traceable identity path, a source-side decision, and reproducible evidence.</blockquote></div></section>
      </main>
      <footer><span>DataLand · Round 2 preparation</span><a href="./index.html">Return to architecture briefing</a></footer>
    </div>
  )
}