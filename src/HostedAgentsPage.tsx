import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, Database, GitBranch, KeyRound, ShieldCheck } from 'lucide-react'
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
]

export default function HostedAgentsPage() {
  return <div className="detail-page">
    <header className="topbar workshop-topbar">
      <a className="partner-logos" href="./index.html" aria-label="Return to agent governance"><img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" /><span className="logo-divider" /><span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span></a>
      <a className="workshop-back" href="./index.html#agenda"><ArrowLeft size={16} /> Agenda topics</a>
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
      <section className="section detail-steps"><div className="detail-heading"><div><p className="eyebrow">Day 1 blocks</p><h2>Build vertically, then test horizontally.</h2></div><p>No fixed times. Each block ends with evidence that can be reviewed before the next begins.</p></div><div className="step-grid">{proofSteps.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
      <section className="section detail-resources"><div className="detail-heading"><div><p className="eyebrow">Build resources</p><h2>Proof first. Product claims second.</h2></div></div><div className="resource-card-grid">{resources.map(([type, title, href]) => <a href={href} target="_blank" rel="noreferrer" key={href}><GitBranch /><small>{type}</small><h3>{title}</h3><strong>Open resource <ArrowUpRight size={15} /></strong></a>)}</div></section>
    </main>
    <footer><span>DataLand · Hosted agents</span><div className="detail-footer-links"><a href="./index.html">Governance position</a><a href="./protocols.html">Continue to Day 2</a></div></footer>
  </div>
}