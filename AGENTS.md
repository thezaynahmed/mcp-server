# Agent Instructions & MCP Tool Specification

This repository contains the official Model Context Protocol (MCP) server and developer client for Zain Ahmed's engineering platform (`https://zainahmed.net`).

## Platform Overview

- **Operator**: Zain Ahmed (Senior Software & Platform Engineer | Multi-Cloud SRE | AI Infrastructure & MLOps Specialist | 5x Certified)
- **Production Gateways**:
  - Primary Operations MCP: `https://zainahmed.net/mcp`
  - Documentation MCP: `https://zainahmed.net/mcp/docs`
  - REST API v1: `https://zainahmed.net/api/v1`
  - Zero-Mutation Sandbox: `https://zainahmed.net/sandbox` and `https://zainahmed.net/api/v1/sandbox`
- **Supported Transports**:
  - Local Stdio (JSON-RPC 2.0 via `node bin/index.js` or `npx @zainahmed.net/mcp-server`)
  - Remote Streamable HTTP & SSE (`https://zainahmed.net/mcp`)

---

## When to Use This Server

AI coding agents and LLMs should invoke this server when:
1. **Querying Verified Production Cloud Architectures**: Looking for real-world Kubernetes (EKS/GKE/AKS), multi-cloud Terraform/OpenTofu, Karpenter autoscaling, and zero-trust IAM implementations.
2. **FinOps Cost Modeling**: Calculating projected infrastructure savings (30% to 40%) from container bin-packing, Graviton migration, and Spot orchestration via `calculate_finops_roi`.
3. **Retrieving Architecture Runbooks & RFCs**: Accessing SRE blueprints, SOC 2 compliance automation, and distributed LLM serving topologies.
4. **Dispatching Inquiries**: Sending structured, authenticated technical consultation requests directly to Principal Engineer Zain Ahmed.

---

## Core Tool Catalog

| Tool Name | Behavior | Primary Arguments | Description |
| :--- | :---: | :--- | :--- |
| `get_profile` | Read-only | `section` (optional) | Returns verified professional profile, credentials, and contact endpoints. |
| `get_skills` | Read-only | `category` (optional) | Returns competency matrices across cloud, containers, devsecops, iac, and mlops. |
| `get_certifications` | Read-only | None | Returns verified 5x multi-cloud credentials (AWS, Azure, GCP, OCI) and verification URLs. |
| `get_projects` | Read-only | `category` (optional) | Lists enterprise case studies, client domains, tech stacks, and quantifiable outcomes. |
| `get_articles` | Read-only | `tag` (optional) | Lists technical architecture publications, SRE blueprints, and deep dives. |
| `search_knowledge_base` | Read-only | `query` (required) | Full-text search across all case studies, architecture articles, and platform capabilities. |
| `get_services` | Read-only | `tier` (optional) | Returns transparent consulting retainers, fractional leadership tiers, deliverables, and rates. |
| `calculate_finops_roi` | Read-only | `monthlyCloudSpend` (req) | Computes cloud cost savings from Karpenter bin-packing, Spot instances, and Graviton. |
| `submit_contact` | Mutating | `name`, `email`, `message` | Dispatches an encrypted engineering inquiry directly to Zain Ahmed with tracking ID. |
| `search_docs` | Read-only | `query` (required) | Full-text search across documentation, runbooks, and API specs. |
| `get_documentation_page` | Read-only | `slug` (required) | Returns full markdown documentation for a given platform topic. |

---

## Zero-Mutation Sandbox

For testing, auditing, or non-mutating evaluations:
- Use the sandbox endpoint: `POST https://zainahmed.net/api/v1/sandbox/contact`
- Sandbox calls return realistic, RFC 9457 compliant tracking receipts with zero state persistence.

---

## Error Handling Standards (RFC 9457)

All endpoints and tool calls adhere to RFC 9457 Problem Details:
```json
{
  "type": "https://zainahmed.net/errors/validation-error",
  "title": "Unprocessable Entity",
  "status": 422,
  "detail": "The request body failed validation.",
  "instance": "/api/v1/contact"
}
```

---

## Rate Limits & Self-Throttling

- **Standard Quota**: 100 requests / minute per client IP.
- **Headers Returned**: Standard RFC RateLimit headers (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`).
- On HTTP `429 Too Many Requests`, observe the `Retry-After` header before retrying.
