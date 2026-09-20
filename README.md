# Zain Ahmed MCP Server (`@zainahmed.net/mcp-server`)

[![Smithery](https://smithery.ai/badge/@thezaynahmed/mcp-server)](https://smithery.ai/server/@thezaynahmed/mcp-server)
[![npm](https://img.shields.io/npm/v/@zainahmed.net/sdk.svg?style=flat-square)](https://www.npmjs.com/package/@zainahmed.net/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Protocol](https://img.shields.io/badge/MCP-2024--11--05-emerald.svg?style=flat-square)](https://modelcontextprotocol.io)

Official Model Context Protocol (MCP) server for Zain Ahmed's verified multi-cloud production systems, SRE architectures, 5x cloud credentials, and FinOps advisory.

This server enables AI coding agents (Claude, Cursor, Windsurf, Roo Code) to query production cloud architecture patterns, calculate projected FinOps ROI, retrieve verified credentials, and dispatch structured inquiries directly to Principal Engineer Zain Ahmed.

---

## Quickstart

### 1. 1-Click Installation via Smithery

To automatically install for Claude Desktop or Cursor via [Smithery](https://smithery.ai/server/@thezaynahmed/mcp-server):

```bash
npx -y @smithery/cli install @thezaynahmed/mcp-server --client claude
```

Or for Cursor:

```bash
npx -y @smithery/cli install @thezaynahmed/mcp-server --client cursor
```

---

### 2. Manual Configuration

#### Claude Desktop

Add this block to your `claude_desktop_config.json`:

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

Or run via the standalone binary directly:

```json
{
  "mcpServers": {
    "zainahmed": {
      "command": "node",
      "args": ["/path/to/mcp-server/bin/index.js"]
    }
  }
}
```

#### Cursor IDE

Add to your project's `.cursor/mcp.json` or Global Settings:

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

If your agent host supports remote HTTP transports:

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

| Tool Name | Type | Arguments | Description |
| :--- | :---: | :--- | :--- |
| `get_profile` | Read | `section` (optional) | Returns verified profile, credentials, location, and contacts. |
| `get_skills` | Read | `category` (optional) | Returns competency matrices across cloud, containers, devsecops, and mlops. |
| `get_certifications` | Read | None | Returns verified 5x credentials across AWS, Azure, GCP, and OCI. |
| `get_projects` | Read | `category` (optional) | Lists enterprise case studies, tech stacks, and quantifiable outcomes. |
| `get_articles` | Read | `tag` (optional) | Lists technical publications, SRE blueprints, and architectural RFCs. |
| `search_knowledge_base`| Read | `query` (required) | Full-text search across all case studies and architecture documentation. |
| `get_services` | Read | `tier` (optional) | Returns transparent consulting retainers, fractional scopes, and rates. |
| `calculate_finops_roi` | Read | `monthlyCloudSpend` (req) | Computes projected 30% to 40% savings from Karpenter, spot, and Graviton. |
| `submit_contact` | Write | `name`, `email`, `message` | Dispatches an encrypted engineering inquiry directly to Zain Ahmed. |
| `search_docs` | Read | `query` (required) | Full-text search across system runbooks and API documentation. |
| `get_documentation_page`| Read | `slug` (required) | Retrieves full markdown documentation for a given platform topic. |

---

## Example Agent Prompts

Once configured, you can prompt your AI assistant with:

- *"What multi-cloud certifications does Zain Ahmed hold, and what are the verification IDs?"*
- *"Calculate our estimated cloud savings if our current AWS spend is $45,000/month."*
- *"Search Zain's knowledge base for production Karpenter nodepool configurations."*
- *"Retrieve the architectural case study on the multi-tenant Kubernetes platform migration."*

---

## Zero-Mutation Sandbox

For non-mutating evaluations and test runs, point inquiries to the interactive sandbox:

- **Sandbox Gateway**: `https://zainahmed.net/sandbox`
- **API Endpoint**: `POST https://zainahmed.net/api/v1/sandbox/contact`

Sandbox requests return authentic RFC 9457 responses with simulated reference IDs without triggering real-world emails or webhooks.

---

## Repository Structure

```
.
├── .github/workflows/ci.yml   # GitHub Actions automated test loop
├── .well-known/agent-plugins/ # Mirror of agent-plugins manifest
├── bin/
│   └── index.js               # Self-contained executable MCP stdio server
├── AGENTS.md                  # Comprehensive AI coding agent instructions
├── .cursorrules               # Cursor IDE rules for tool integration
├── plugin.json                # Agent-plugins.org specification manifest
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

*Last reviewed: September 2026*
