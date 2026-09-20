# Zain Ahmed Platform MCP Server

Official Model Context Protocol (MCP) server for Zain Ahmed's verified multi-cloud production systems, SRE blueprints, 5x cloud credentials, and FinOps advisory.

[![Smithery Registry](https://img.shields.io/badge/Smithery-Registry-orange.svg?style=flat-square)](https://smithery.ai/server/@zainahmed-net/mcp-server)
[![npm version](https://img.shields.io/npm/v/@zainahmed.net/sdk.svg?style=flat-square&color=2563eb)](https://www.npmjs.com/package/@zainahmed.net/sdk)
[![CI Status](https://img.shields.io/github/actions/workflow/status/thezaynahmed/mcp-server/ci.yml?branch=main&style=flat-square)](https://github.com/thezaynahmed/mcp-server/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![MCP Protocol](https://img.shields.io/badge/MCP-2024--11--05-emerald.svg?style=flat-square)](https://modelcontextprotocol.io)
[![Live Platform](https://img.shields.io/badge/Live%20Platform-zainahmed.net-0066cc.svg?style=flat-square)](https://zainahmed.net)

This server connects autonomous AI agents (Claude Code, Cursor, Windsurf, Roo Code, Antigravity) directly to Zain Ahmed's cloud engineering platform. It enables agents to inspect verified cloud architectures, calculate projected FinOps cost savings, search technical runbooks, and dispatch encrypted consultation inquiries.

---

## Prerequisites

- **Node.js**: `>= 18.0.0`
- **MCP Client**: Claude Desktop, Cursor IDE, Windsurf, Roo Code, Antigravity, or any JSON-RPC 2.0 compliant host
- **Zero External Dependencies**: Standalone stdio binary runs with pure Node.js built-ins

---

## Quickstart

### 1. 1-Click Installation via Smithery

Install automatically for your preferred AI client through [Smithery](https://smithery.ai/server/@zainahmed-net/mcp-server):

**Claude Desktop:**
```bash
npx -y @smithery/cli install @zainahmed-net/mcp-server --client claude
```

**Cursor IDE:**
```bash
npx -y @smithery/cli install @zainahmed-net/mcp-server --client cursor
```

---

### 2. Manual Client Configuration

#### Claude Desktop

Add this configuration to your `claude_desktop_config.json`:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "zainahmed": {
      "command": "npx",
      "args": ["-y", "@zainahmed.net/sdk", "mcp"]
    }
  }
}
```

Or run the local repository binary directly:

```json
{
  "mcpServers": {
    "zainahmed": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/bin/index.js"]
    }
  }
}
```

#### Cursor IDE

Add this to `.cursor/mcp.json` in your workspace or through Cursor Global Settings:

```json
{
  "mcpServers": {
    "zainahmed": {
      "command": "npx",
      "args": ["-y", "@zainahmed.net/sdk", "mcp"]
    }
  }
}
```

#### Remote Streamable HTTP (No Node.js Required)

If your client supports remote HTTP/SSE transports, connect directly to the hosted endpoints:

```json
{
  "mcpServers": {
    "zainahmed-operations": {
      "url": "https://zainahmed.net/mcp"
    },
    "zainahmed-docs": {
      "url": "https://zainahmed.net/mcp/docs"
    }
  }
}
```

---

## Available Tools

| Tool Name | Mode | Arguments | Description |
| :--- | :---: | :--- | :--- |
| `get_profile` | Read | `section` (optional) | Returns verified platform profile, certifications, and contacts. |
| `get_skills` | Read | `category` (optional) | Returns competency matrices across cloud, containers, devsecops, and mlops. |
| `get_certifications` | Read | None | Returns verified credentials across AWS, Azure, GCP, and OCI. |
| `get_projects` | Read | `category` (optional) | Lists enterprise case studies, tech stacks, and quantifiable business outcomes. |
| `get_articles` | Read | `tag` (optional) | Lists technical publications, SRE blueprints, and architectural RFCs. |
| `search_knowledge_base` | Read | `query` (required) | Full-text semantic search across case studies and architecture documentation. |
| `get_services` | Read | `tier` (optional) | Returns advisory consulting retainers, fractional scopes, and service tiers. |
| `calculate_finops_roi` | Read | `monthlyCloudSpend` (req) | Computes projected 30% to 40% cost reductions from Karpenter, spot, and Graviton. |
| `submit_contact` | Write | `name`, `email`, `message` | Dispatches an encrypted engineering inquiry directly to Zain Ahmed. |
| `search_docs` | Read | `query` (required) | Searches system runbooks, API guides, and versioning specifications. |
| `get_documentation_page` | Read | `slug` (required) | Retrieves full markdown documentation for any platform topic or API guide. |

---

## Example Agent Prompts

Once configured, AI coding assistants can answer technical queries using live server data:

- *"What multi-cloud certifications does Zain Ahmed hold, and what are their verification IDs?"*
- *"Calculate our estimated monthly cloud savings if our current AWS spend is $45,000/month."*
- *"Search Zain's knowledge base for production Karpenter nodepool and autoscaling patterns."*
- *"Retrieve the architectural case study on the multi-tenant Kubernetes platform migration."*
- *"Dispatch a message to Zain requesting an architectural review for our Terraform migration."*

---

## Interactive Zero-Mutation Sandbox

For non-mutating evaluations and test runs, point inquiries to the interactive sandbox:

- **Web Console**: [https://zainahmed.net/sandbox](https://zainahmed.net/sandbox)
- **API Endpoint**: `POST https://zainahmed.net/api/v1/sandbox/contact`

Sandbox requests return authentic RFC 9457 responses with simulated reference IDs without triggering real-world emails or webhooks.

---

## Local Development & Testing

### 1. Clone Repository

```bash
git clone https://github.com/thezaynahmed/mcp-server.git
cd mcp-server
```

### 2. Verify Syntax

```bash
node --check bin/index.js
```

### 3. Test MCP Handshake via Stdio

Send a standard JSON-RPC 2.0 initialization payload:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node bin/index.js
```

---

## Repository Structure

```
.
├── .github/workflows/ci.yml   # GitHub Actions automated syntax and lint check
├── .well-known/agent-plugins/ # Mirror of agent-plugins.org manifest
├── bin/
│   └── index.js               # Standalone executable MCP stdio server
├── AGENTS.md                  # Comprehensive AI coding agent instructions
├── .cursorrules               # Cursor IDE rules for MCP integration
├── plugin.json                # Agent-plugins.org discovery manifest
├── smithery.yaml              # Smithery 1-click registry descriptor
├── package.json               # Package metadata and bin declaration
├── LICENSE                    # MIT License
└── README.md                  # Project documentation & integration guide
```

---

## Related Resources

- [Zain Ahmed Portfolio Platform](https://zainahmed.net)
- [Official TypeScript SDK on npm](https://www.npmjs.com/package/@zainahmed.net/sdk)
- [Official Python SDK on PyPI](https://pypi.org/project/zainahmed-sdk/1.0.2/)
- [OpenAPI 3.1 REST Specification](https://zainahmed.net/openapi.json)
- [Agent Authentication Protocol](https://zainahmed.net/auth.md)

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

*Last reviewed: September 2026*
