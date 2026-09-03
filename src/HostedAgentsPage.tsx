import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, Boxes, Database, GitBranch, KeyRound, MonitorCheck, ShieldCheck } from 'lucide-react'
import './index.css'
import './App.css'

const proofSteps = [
  ['01', 'Host the agent', 'Deploy Agent Framework code to Microsoft Foundry Agent Service with the Responses protocol and a managed endpoint.'],
  ['02', 'Connect Databricks', 'Use a remote MCP tool to reach the Databricks interface. Genie is the adapter in this proof, not the customer requirement itself.'],
  ['03', 'Preserve the user', 'Authenticate independently in each tenant. Databricks-native OAuth issues the Tenant 2 token used at the data boundary.'],
  ['04', 'Prove source authorization', 'Ask the same question as users with different entitlements and capture the rows returned by Unity Catalog RLS.'],
]

const resources = [
  ['Community proof', 'Cross-Tenant AI over Governed Data', 'https://github.com/khalilchouchen1994/cross-tenant-ai-governed-data'],
  ['Microsoft quickstart', 'Deploy a Foundry hosted agent', 'https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent'],
  ['Microsoft samples', 'Agent Framework hosted agents', 'https://github.com/microsoft/agent-framework/tree/main/python/samples/04-hosting/foundry-hosted-agents'],
  ['Technical walkthrough', 'Foundry Toolbox OBO authentication', 'https://tsmatz.wordpress.com/2026/08/18/microsoft-foundry-mcp-obo-authentication-in-toolbox-by-user-entra-token/'],
]

const identityPaths = [
  ['Option 01', 'User Entra Token through Toolbox', 'Foundry combines the hosted agent identity with caller context to obtain a tool-specific user token. The documented built-in path requires a Foundry Toolbox, DefaultAzureCredential, supported Microsoft audiences and supported first-party tools. Verify availability and exact tool support.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/tool-authentication'],
  ['Option 02', 'OAuth identity passthrough', 'The user signs in and consents on first use. The connection requests the scopes required by the remote MCP or data service, and that downstream system authorizes the user. Use this path for endpoints that are not eligible for the built-in User Entra Token flow.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication'],
]

const productionChecks = [
  ['Session isolation', 'Treat one user and one session as an isolation boundary. Foundry documents a dedicated VM-isolated sandbox per session; prove that files, tool outputs, memory and credentials created by User A cannot be read by User B.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents'],
  ['Sandbox and cleanup', 'Verify per-session filesystem persistence, tool permissions, network boundaries, idle cleanup and the documented 30-day inactive-session deletion behavior. Do not infer isolation from container behavior; test the hosted session boundary.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents'],
  ['Portable deployment', 'Keep environment-specific endpoints, connections and credentials outside agent code. The same Agent Framework implementation should be deployable to approved environments with configuration changes, not authorization rewrites.', 'https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent'],
  ['Continuous quality', 'Version prompts, tools and policies; replay representative traces after every change; monitor quality, authorization failures, latency, cost and drift; use evaluations and optimization only behind release gates.', 'https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview'],
]

export default function HostedAgentsPage() {
  return <div className="detail-page">
    <header className="topbar workshop-topbar">
      <a className="partner-logos" href="./index.html" aria-label="Return to agent governance"><img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" /><span className="logo-divider" /><span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span></a>
      <a className="workshop-back" href="./index.html#workstreams"><ArrowLeft size={16} /> Agenda topics</a>
      <span className="date-pill">Day 1 · Hosted agents</span>
    </header>
    <main>
      <section className="detail-hero hosted-detail-hero">
        <div><p className="eyebrow">Day 1 · governed agent runtime</p><h1>Host the agent.<br /><span>Keep authorization at source.</span></h1><p className="lede">The customer requirement is a Foundry agent accessing governed Databricks data. Hosting is one layer; identity, runtime policy and Unity Catalog remain the controls that make the path governable.</p><a className="button primary" href="#architecture">Open the architecture <ArrowRight size={17} /></a></div>
        <div className="detail-principles"><span>Proof standard</span><strong>One question</strong><strong>Two users</strong><strong>Different permitted rows</strong></div>
      </section>
      <section className="section" id="architecture">
        <div className="detail-heading"><div><p className="eyebrow">Cross-tenant path</p><h2>Two identity hops. One visible authorization decision.</h2></div><p>Tenant 2 validates its own Databricks OAuth token, not the Tenant 1 token. The proof succeeds only when Unity Catalog filters the answer for the signed-in user.</p></div>
        <div className="tenant-flow">
          <article><span><Bot /></span><small>Tenant 1</small><h3>Foundry hosted agent</h3><p>Agent Framework code, Responses endpoint and user-facing orchestration.</p></article>
          <div><KeyRound /><strong>RemoteTool + OAuth</strong><small>Independent token hop</small></div>
          <article><span><Database /></span><small>Tenant 2</small><h3>Azure Databricks</h3><p>Genie handles the natural-language request. Unity Catalog RLS decides which rows return.</p></article>
        </div>
        <div className="proof-banner"><ShieldCheck /><div><strong>Customer-safe claim</strong><p>The community repository is a reproducible proof pattern, not an official Microsoft sample. Validate its OAuth consent, tenant setup and authorization behavior in the customer environment.</p></div></div>
      </section>
      <section className="section identity-options">
        <div className="detail-heading"><div><p className="eyebrow">Authentication and authorization</p><h2>Propagate identity in one of two explicit ways.</h2></div><p>Foundry authenticates the caller and tool connection. It does not replace the source system’s authorization decision. Choose the token path before implementation and prove that the scope only narrows as the request moves downstream.</p></div>
        <div className="identity-option-grid">{identityPaths.map(([label, title, detail, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}><span>{label}</span><h3>{title}</h3><p>{detail}</p><strong className="card-link">Open official topic <ArrowUpRight size={14} /></strong></a>)}</div>
        <div className="runtime-identity-note"><Bot /><div><strong>Local and hosted credentials are different</strong><p>Locally, <code>DefaultAzureCredential</code> can resolve the signed-in developer. In a hosted agent it resolves the agent identity, while Foundry Toolbox uses caller context to obtain the tool-specific user token. A direct tool connection that works locally is therefore not evidence that hosted OBO works; test the hosted Toolbox path explicitly.</p></div></div>
        <div className="cross-tenant-note"><KeyRound /><div><strong>Cross-tenant requirement</strong><p>For the Databricks proof, invite the person into Tenant 2 as a B2B guest only if that is the agreed identity model, grant the guest the minimum workspace and data entitlements, and obtain a Tenant 2 token. Do not pass a Tenant 1 token directly to the Tenant 2 data plane.</p></div></div>
      </section>
      <section className="section detail-steps"><div className="detail-heading"><div><p className="eyebrow">Day 1 blocks</p><h2>Build vertically, then test horizontally.</h2></div><p>No fixed times. Each block ends with evidence that can be reviewed before the next begins.</p></div><div className="step-grid">{proofSteps.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
      <section className="section hosted-production">
        <div className="detail-heading light"><div><p className="eyebrow">Production readiness</p><h2>Hosting changes operations, not the authorization contract.</h2></div><p>The team has not yet deployed a production agent. Treat isolation, portability, monitoring and controlled evolution as acceptance criteria, not post-PoC cleanup.</p></div>
        <div className="production-grid">{productionChecks.map(([title, detail, href], index) => <a href={href} target="_blank" rel="noreferrer" key={title}><span className="production-icon">{index === 0 ? <Boxes /> : index === 3 ? <MonitorCheck /> : <ShieldCheck />}</span><h3>{title}</h3><p>{detail}</p><strong className="card-link light-link">Open official topic <ArrowUpRight size={14} /></strong></a>)}</div>
      </section>
      <section className="section detail-resources"><div className="detail-heading"><div><p className="eyebrow">Build resources</p><h2>Proof first. Product claims second.</h2></div></div><div className="resource-card-grid">{resources.map(([type, title, href]) => <a href={href} target="_blank" rel="noreferrer" key={href}><GitBranch /><small>{type}</small><h3>{title}</h3><strong>Open resource <ArrowUpRight size={15} /></strong></a>)}</div></section>
    </main>
    <footer><span>DataLand · Hosted agents</span><div className="detail-footer-links"><a href="./index.html">Governance position</a><a href="./protocols.html">Continue to Day 2</a></div></footer>
  </div>
}