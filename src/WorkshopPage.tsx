import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, Boxes, CalendarDays, CheckCircle2, Code2, Database, ExternalLink, GitBranch, KeyRound, Network, Route, ShieldCheck, Wrench } from 'lucide-react'
import './index.css'
import './App.css'

const hostedSteps = [
  ['01', 'Start with the hosted runtime', 'Deploy Agent Framework code to Foundry Agent Service with the Responses protocol. Use code deployment so dependencies build in the managed runtime.'],
  ['02', 'Connect governed Databricks data', 'Use a remote MCP tool to reach the Databricks interface. Genie is the adapter in the current proof, not the scope of the customer requirement.'],
  ['03', 'Keep the user in the chain', 'Authenticate the user independently in each tenant. Databricks-native OAuth issues the Tenant 2 token used by Unity Catalog.'],
  ['04', 'Prove authorization at source', 'Ask one generic question as users with different entitlements and capture the rows returned by Unity Catalog Row-Level Security.'],
]

const agenda = {
  day1: [
    ['Block 1', 'Governance frame and proof criteria', 'Anchor the three topics in the governance position. Agree what identity, trace, source decision and denial evidence must be visible.'],
    ['Block 2', 'Hosted agent baseline', 'Deploy and invoke a minimal Agent Framework agent in Foundry. Review source deployment, endpoint routing, logs and versioning.'],
    ['Block 3', 'Cross-tenant Databricks scenario', 'Walk through the two-tenant identity flow, connect the hosted agent to Databricks data, and execute the governed question.'],
    ['Block 4', 'Authorization evidence review', 'Compare allowed and restricted results. Separate what the community proof demonstrates from what still needs customer-environment validation.'],
  ],
  day2: [
    ['Block 1', 'A2A and MCP architecture', 'Use A2A for remote agent collaboration and MCP for tools and data. Define discovery, ownership, identity and trust boundaries.'],
    ['Block 2', 'Deploy the MCP path', 'Host or connect a remote MCP server, configure its Foundry connection, restrict tools, require approval and inspect the tool trace.'],
    ['Block 3', 'Deploy the A2A path', 'Expose an Agent Framework agent through an A2A server, publish its agent card, connect a client agent and delegate a task.'],
    ['Block 4', 'Combined showcase and decisions', 'Run one orchestrator that delegates to an A2A specialist which uses an MCP data tool. Close production, security and ownership decisions.'],
  ],
}

const resources = [
  {
    type: 'Customer-relevant proof · community repository',
    title: 'Cross-Tenant AI over Governed Data',
    detail: 'Foundry in Tenant 1 calls Databricks Genie in Tenant 2 through MCP and Databricks-native OAuth. Unity Catalog RLS returns only the signed-in user’s region.',
    href: 'https://github.com/khalilchouchen1994/cross-tenant-ai-governed-data',
  },
  {
    type: 'Official Microsoft quickstart',
    title: 'Deploy a Foundry hosted agent',
    detail: 'Scaffold, provision, test, deploy and invoke an Agent Framework hosted agent with azd, Python, .NET or VS Code.',
    href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent',
  },
  {
    type: 'Official Microsoft samples',
    title: 'Foundry hosted agents',
    detail: 'Maintained Python samples for the Responses protocol, MCP tools, toolboxes, workflows and observability.',
    href: 'https://github.com/microsoft/agent-framework/tree/main/python/samples/04-hosting/foundry-hosted-agents',
  },
]

export default function WorkshopPage() {
  return (
    <div className="track-page">
      <header className="topbar workshop-topbar">
        <a className="partner-logos" href="./index.html" aria-label="Return to the governance briefing">
          <img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" />
          <span className="logo-divider" />
          <span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span>
        </a>
        <a className="workshop-back" href="./index.html"><ArrowLeft size={16} /> Agent governance</a>
        <span className="date-pill"><CalendarDays size={15} /> AI track · Day 1 + 2</span>
      </header>

      <main>
        <section className="track-hero">
          <div>
            <p className="eyebrow">AI track · customer discussion guide</p>
            <h1>Build the agent.<br /><span>Prove the boundary.</span></h1>
            <p className="lede">A practical route from a Foundry hosted agent to governed Databricks data, followed by a clear choice between agent collaboration with A2A and tool connectivity with MCP.</p>
            <div className="hero-actions"><a className="button primary" href="#hosted">Hosted agents <ArrowRight size={17} /></a><a className="button secondary" href="#agenda">Open agenda</a></div>
          </div>
          <div className="track-map" aria-label="AI track topics">
            <article><span>01</span><Bot /><div><strong>Hosted agents</strong><small>Foundry to Databricks</small></div></article>
            <article><span>02</span><Network /><div><strong>A2A vs MCP</strong><small>Agent or tool boundary</small></div></article>
            <article><span>03</span><CalendarDays /><div><strong>Two-day agenda</strong><small>Four blocks each day</small></div></article>
          </div>
        </section>

        <nav className="track-jump" aria-label="AI track sections">
          <a href="#hosted">01 · Hosted agents</a><a href="#protocols">02 · A2A vs MCP</a><a href="#agenda">03 · Agenda</a>
        </nav>

        <section className="section hosted-section" id="hosted">
          <div className="track-heading"><div><p className="eyebrow">01 · Hosted agents</p><h2>Foundry-hosted reasoning. Databricks-enforced access.</h2></div><p>The client ask is a Foundry agent accessing governed Databricks data. The supplied proof uses Genie as the natural-language interface, MCP as the remote-tool contract, and Unity Catalog as the authorization boundary.</p></div>
          <div className="cross-tenant-flow" aria-label="Cross-tenant hosted agent architecture">
            <article><span><Bot /></span><small>Tenant 1</small><h3>Foundry hosted agent</h3><p>Agent Framework code, Responses endpoint and user-facing orchestration.</p></article>
            <div className="flow-bridge"><KeyRound /><strong>RemoteTool + OAuth</strong><small>Independent token hop</small></div>
            <article><span><Database /></span><small>Tenant 2</small><h3>Azure Databricks</h3><p>Genie receives the request. Unity Catalog RLS decides which rows the user can see.</p></article>
          </div>
          <div className="proof-callout"><ShieldCheck /><div><strong>What the proof demonstrates</strong><p>A user native to Tenant 1 can authorize against Databricks in Tenant 2 and receive a result filtered by that user’s Unity Catalog policy. Tenant 2 validates its own Databricks OAuth token, not the Tenant 1 token.</p></div><span>Community proof<br />Validate in PoC</span></div>
          <div className="hosted-steps">{hostedSteps.map(([number, title, detail]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
          <div className="scenario-repo-grid track-resources">{resources.map((resource) => <a href={resource.href} target="_blank" rel="noreferrer" key={resource.title}><span className="repo-icon"><GitBranch size={22} /></span><small>{resource.type}</small><h3>{resource.title}</h3><p>{resource.detail}</p><strong>Open resource <ArrowUpRight size={15} /></strong></a>)}</div>
        </section>

        <section className="section protocol-section" id="protocols">
          <div className="track-heading light"><div><p className="eyebrow">02 · Protocol choice</p><h2>A2A and MCP solve different problems.</h2></div><p>They are complementary. A specialist agent can be exposed through A2A while using MCP internally to reach governed tools and data.</p></div>
          <div className="protocol-grid">
            <article className="protocol-card a2a-card"><div className="protocol-title"><Network /><div><span>Agent to agent</span><h3>A2A</h3></div></div><p>Use when an independent agent owns skills, reasoning and task state, and another agent needs to discover and delegate work to it.</p><ul><li><CheckCircle2 />Publishes an Agent Card for discovery</li><li><CheckCircle2 />Supports tasks, messages and artifacts</li><li><CheckCircle2 />Keeps the remote agent opaque</li><li><CheckCircle2 />Fits cross-framework collaboration</li></ul><div className="deploy-strip"><Code2 /><div><strong>Deploy it</strong><span>Wrap the Agent Framework agent in an A2A server, expose HTTP, publish <code>/.well-known/agent-card.json</code>, then deploy that web service to your chosen compute.</span></div></div><a href="https://github.com/microsoft/agent-framework/tree/main/python/samples/04-hosting/a2a" target="_blank" rel="noreferrer">Microsoft A2A hosting samples <ExternalLink size={14} /></a></article>
            <article className="protocol-card mcp-card"><div className="protocol-title"><Wrench /><div><span>Agent to tool</span><h3>MCP</h3></div></div><p>Use when an agent needs a standard contract to discover and invoke tools, APIs, prompts or governed data sources.</p><ul><li><CheckCircle2 />Discovers named tools and schemas</li><li><CheckCircle2 />Supports approval before invocation</li><li><CheckCircle2 />Carries connection authentication</li><li><CheckCircle2 />Fits reusable Foundry Toolboxes</li></ul><div className="deploy-strip"><Route /><div><strong>Deploy it</strong><span>Expose a streamable HTTP endpoint on Azure Container Apps or Functions, create a Foundry RemoteTool connection, restrict <code>allowed_tools</code>, and attach it to the agent or Toolbox.</span></div></div><a href="https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol" target="_blank" rel="noreferrer">Microsoft Foundry MCP guide <ExternalLink size={14} /></a></article>
          </div>
          <div className="combined-pattern"><Boxes /><div><span>Recommended combined showcase</span><strong>Orchestrator agent <ArrowRight /> A2A specialist <ArrowRight /> MCP data tool</strong><p>A2A delegates a business task to a specialist. MCP gives that specialist controlled access to Databricks or another source. Authorization still belongs at the data boundary.</p></div></div>
          <div className="protocol-links"><a href="https://a2a-protocol.org/latest/" target="_blank" rel="noreferrer">A2A specification and SDKs <ExternalLink size={13} /></a><a href="https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/05-end-to-end/A2AClientServer" target="_blank" rel="noreferrer">Microsoft .NET A2A client/server <ExternalLink size={13} /></a><a href="https://github.com/microsoft/agent-framework/tree/main/python/samples/04-hosting/mcp" target="_blank" rel="noreferrer">Microsoft MCP hosting samples <ExternalLink size={13} /></a><a href="https://github.com/Azure-Samples/mcp-container-ts" target="_blank" rel="noreferrer">Azure Container Apps MCP sample <ExternalLink size={13} /></a></div>
        </section>

        <section className="section agenda-section" id="agenda">
          <div className="track-heading"><div><p className="eyebrow">03 · AI track agenda</p><h2>Two days. Four blocks per day.</h2></div><p>No fixed timings are assumed. Each block ends with an observable output so the track moves from architecture into deployable proof.</p></div>
          <div className="agenda-days">
            <section><div className="agenda-day-title"><span>Day 1</span><div><h3>Hosted agents and governed data</h3><p>Build the vertical path and prove per-user access.</p></div></div><div className="agenda-blocks">{agenda.day1.map(([block, title, detail]) => <article key={block}><span>{block}</span><h4>{title}</h4><p>{detail}</p></article>)}</div></section>
            <section><div className="agenda-day-title"><span>Day 2</span><div><h3>Protocol interoperability</h3><p>Deploy A2A and MCP, then show them together.</p></div></div><div className="agenda-blocks">{agenda.day2.map(([block, title, detail]) => <article key={block}><span>{block}</span><h4>{title}</h4><p>{detail}</p></article>)}</div></section>
          </div>
          <div className="agenda-outcomes"><strong>Track outputs</strong><span>Hosted agent endpoint</span><span>Cross-tenant authorization evidence</span><span>MCP tool trace</span><span>A2A task delegation</span><span>Production decision log</span></div>
        </section>

        <section className="closing"><ShieldCheck size={24} /><div><p className="eyebrow">Closing proof</p><blockquote>The agent may cross protocols and tenants. The user’s authorization boundary must remain visible, testable and enforced at the data source.</blockquote></div></section>
      </main>
      <footer><span>DataLand · AI track</span><div><a href="./fabric-foundry.html">OneLake scenario</a><a href="./index.html">Agent governance</a></div></footer>
    </div>
  )
}