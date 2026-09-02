import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, CalendarDays, Database, ExternalLink, FlaskConical, GitBranch, KeyRound, Layers3, ShieldCheck } from 'lucide-react'
import './index.css'
import './App.css'

const testSteps = [
  ['01', 'Prepare governed tables', 'Load a small authorization-aware dataset into Lakehouse or Warehouse tables. Fabric Data Agent does not read standalone OneLake files.'],
  ['02', 'Publish the data agent', 'Select only the relevant tables, add domain instructions and examples, publish, then grant both test users READ access to the agent.'],
  ['03', 'Create the Foundry connection', 'Use the Fabric data agent workspace ID and artifact ID to create a Microsoft Fabric project connection in Foundry.'],
  ['04', 'Attach the Fabric tool', 'Add the Microsoft Fabric tool to a Foundry prompt or hosted agent and require it for the fixed test questions.'],
  ['05', 'Prove identity at source', 'Run the same questions as an allowed user and a denied user. Capture the tool trace, generated query, result and authorization failure.'],
]

const resources = [
  {
    label: 'End-to-end lab',
    title: 'Microsoft Fabric inventory planning MicroHack',
    detail: 'Creates a Lakehouse, publishes a Fabric Data Agent, connects a Foundry prompt agent, and adds a human approval step.',
    href: 'https://github.com/microsoft/MicroHack/tree/main/03-Azure/01-04-AI/02_Inventory_Planning_Fabric',
  },
  {
    label: 'Python SDK sample',
    title: 'Azure AI Projects Fabric tool',
    detail: 'Minimal official Python example using the Fabric project connection and Fabric data agent tool.',
    href: 'https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-agents/samples/agents_tools/sample_agents_fabric.py',
  },
  {
    label: '.NET hosted agent',
    title: 'Agent Framework Microsoft Fabric sample',
    detail: 'Official hosted-agent pattern using FoundryAITool.CreateMicrosoftFabricTool with a Fabric connection.',
    href: 'https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/02-agents/AgentProviders/foundry/Agent_Step20_MicrosoftFabric',
  },
]

export default function FabricFoundryPage() {
  return (
    <div className="fabric-page">
      <header className="topbar workshop-topbar">
        <a className="partner-logos" href="./index.html" aria-label="Return to the main briefing">
          <img className="bi-logo" src={`${import.meta.env.BASE_URL}boehringer-ingelheim.svg`} alt="Boehringer Ingelheim" />
          <span className="logo-divider" />
          <span className="microsoft-logo"><img src={`${import.meta.env.BASE_URL}microsoft-mark.svg`} alt="" /><strong>Microsoft</strong></span>
        </a>
        <a className="workshop-back" href="./workshop.html"><ArrowLeft size={16} /> Workshop prep</a>
        <span className="date-pill"><CalendarDays size={15} /> Scenario 22</span>
      </header>

      <main>
        <section className="fabric-hero">
          <div>
            <p className="eyebrow">Integration scenario · structured governed data</p>
            <h1>OneLake insight.<br /><span>Foundry orchestration.</span></h1>
            <p className="lede">Use a Fabric Data Agent as the governed conversational layer over OneLake data, then connect it to a Microsoft Foundry agent through the Fabric tool. The signed-in user’s identity must reach Fabric through On-Behalf-Of authorization.</p>
            <div className="hero-actions"><a className="button primary" href="#test">Open test plan <ArrowRight size={17} /></a><a className="button secondary" href="https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/fabric" target="_blank" rel="noreferrer">Microsoft integration guide <ExternalLink size={15} /></a></div>
          </div>
          <div className="fabric-status-panel">
            <p className="eyebrow">Release boundary</p>
            <div><span>Fabric Data Agent core</span><strong className="release-status release-ga">GA</strong></div>
            <div><span>Foundry Fabric tool</span><strong className="release-status release-preview">Preview</strong></div>
            <div><span>User identity passthrough</span><strong className="release-status release-verify">Verify</strong></div>
            <p>The scenario is valid for a PoC, but the Foundry connection must not be presented as a fully GA production path.</p>
          </div>
        </section>

        <section className="section fabric-flow">
          <div className="fabric-flow-heading"><p className="eyebrow">Reference architecture</p><h2>Foundry orchestrates. Fabric governs the query.</h2><p>Foundry does not directly read arbitrary OneLake files in this pattern. The Fabric Data Agent selects a supported data source, generates a read-only query, and executes it with the requesting user’s permissions.</p></div>
          <div className="flow-diagram" aria-label="OneLake to Foundry identity-aware architecture">
            <article><span><Database /></span><small>Data foundation</small><h3>OneLake</h3><p>Lakehouse or Warehouse tables, semantic models, KQL, mirrored data or ontology.</p></article>
            <ArrowRight className="flow-arrow" />
            <article><span><Layers3 /></span><small>Governed query layer · GA</small><h3>Fabric Data Agent</h3><p>NL2SQL, NL2DAX or NL2KQL with read-only source access.</p></article>
            <ArrowRight className="flow-arrow" />
            <article><span><KeyRound /></span><small>Project connection · Preview</small><h3>Foundry Fabric tool</h3><p>Workspace and artifact connection with user identity passthrough.</p></article>
            <ArrowRight className="flow-arrow" />
            <article><span><Bot /></span><small>Orchestration surface</small><h3>Foundry agent</h3><p>Prompt agent or hosted Agent Framework experience.</p></article>
          </div>
          <div className="identity-rail"><ShieldCheck size={20} /><strong>Signed-in user</strong><span>Foundry token</span><span>OBO</span><span>Fabric permissions</span><span>Source authorization</span></div>
        </section>

        <section className="section scenario-boundaries">
          <div><p className="eyebrow">PoC guardrails</p><h2>Five boundaries to state before the demo.</h2></div>
          <div className="boundary-grid">
            <article><strong>Identity</strong><p>User authentication is required. Service principal authentication is not supported for this Fabric Data Agent integration.</p></article>
            <article><strong>Tenant and region</strong><p>The Foundry project and Fabric agent must share a tenant. The Fabric agent and its data sources need aligned capacity regions.</p></article>
            <article><strong>Structured data only</strong><p>Lakehouse files such as PDF, DOCX, CSV or JSON are not read directly. Expose structured data through selected tables.</p></article>
            <article><strong>Result size</strong><p>Fabric Data Agent is conversational, not a bulk export API. Responses are capped at 25 rows and 25 columns.</p></article>
            <article><strong>Governance maturity</strong><p>Warehouse DLP is GA, while several Purview interaction and access restriction controls remain preview.</p></article>
          </div>
        </section>

        <section className="section scenario-test" id="test">
          <div className="scenario-test-heading"><div><p className="eyebrow">Runnable proof</p><h2>Test the connection and the denial.</h2></div><div className="knockout-note"><FlaskConical /><p><strong>Pass threshold:</strong> the allowed user receives only permitted rows; the denied user receives no restricted data; no shared identity or fallback path is used.</p></div></div>
          <div className="scenario-steps">{testSteps.map(([number, title, detail]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
          <div className="test-evidence-grid">
            <div><span>Allowed user</span><strong>Expected: authorized rows only</strong><p>Capture the signed-in identity, generated source query, trace and returned row set.</p></div>
            <div><span>Restricted user</span><strong>Expected: denial or trimmed result</strong><p>Capture the same artifacts and prove that Foundry does not retry with a broader identity.</p></div>
          </div>
        </section>

        <section className="section scenario-resources">
          <div className="scenario-resource-heading"><div><p className="eyebrow">Official test assets</p><h2>Start with maintained Microsoft examples.</h2></div><p>The MicroHack is the closest end-to-end scenario. Use the SDK samples when the workshop needs a smaller prompt-agent or hosted-agent proof.</p></div>
          <div className="scenario-repo-grid">{resources.map((resource) => <a href={resource.href} target="_blank" rel="noreferrer" key={resource.title}><span className="repo-icon"><GitBranch size={22} /></span><small>{resource.label}</small><h3>{resource.title}</h3><p>{resource.detail}</p><strong>Open on GitHub <ArrowUpRight size={15} /></strong></a>)}</div>
          <div className="scenario-docs">
            <span>Microsoft Learn</span>
            <a href="https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/fabric" target="_blank" rel="noreferrer">Foundry Fabric tool <ExternalLink size={13} /></a>
            <a href="https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent" target="_blank" rel="noreferrer">Fabric Data Agent <ExternalLink size={13} /></a>
            <a href="https://learn.microsoft.com/en-us/fabric/data-science/data-agent-sharing" target="_blank" rel="noreferrer">Sharing and permissions <ExternalLink size={13} /></a>
            <a href="https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/model-context-protocol" target="_blank" rel="noreferrer">MCP and user Entra token <ExternalLink size={13} /></a>
          </div>
        </section>
      </main>
      <footer><span>DataLand · OneLake + Foundry scenario</span><a href="./index.html">Return to architecture briefing</a></footer>
    </div>
  )
}