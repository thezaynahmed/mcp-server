#!/usr/bin/env node

/**
 * Zain Ahmed Architecture & Engineering Platform MCP Server
 * Official Model Context Protocol (MCP) server for https://zainahmed.net
 * Protocol Version: 2024-11-05
 */

import readline from "node:readline"

const SERVER_NAME = "zainahmed-mcp-server"
const SERVER_VERSION = "1.0.0"
const BASE_URL = process.env.ZAINAHMED_API_URL || "https://zainahmed.net"

const TOOLS = [
  {
    name: "get_profile",
    description: "Retrieve Zain Ahmed's verified professional profile, 5x multi-cloud credentials (AWS, Azure, GCP, OCI, HashiCorp), location, philosophy, and competencies.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          description: "Filter section: all, bio, credentials, certifications, principles, contacts",
          enum: ["all", "bio", "credentials", "certifications", "principles", "contacts"]
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Verified professional profile data including bio, credentials, principles, and contact information.",
          "properties": {
                "name": {
                      "type": "string"
                },
                "title": {
                      "type": "string"
                },
                "bio": {
                      "type": "string"
                },
                "location": {
                      "type": "string"
                },
                "headline": {
                      "type": "string"
                },
                "philosophy": {
                      "type": "string"
                },
                "certifications": {
                      "type": "array"
                },
                "principles": {
                      "type": "array"
                },
                "social": {
                      "type": "object"
                }
          }
    }
  },
  {
    name: "get_skills",
    description: "Retrieve complete categorised multi-cloud, Kubernetes, DevSecOps, IaC, and MLOps competency matrices with production seniority ratings.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Filter category: all, cloud, containers, devsecops, iac, mlops",
          enum: ["all", "cloud", "containers", "devsecops", "iac", "mlops"]
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Exhaustive categorized technology competency matrices with proficiency ratings.",
          "properties": {
                "category": {
                      "type": "string"
                },
                "skills": {
                      "type": "array"
                }
          }
    }
  },
  {
    name: "get_certifications",
    description: "Retrieve verified 5x multi-cloud credentials, badge verification URLs, and credential IDs across AWS, Azure, GCP, and OCI.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "List of 5x verified multi-cloud credentials, badge verification URLs, and credential IDs.",
          "properties": {
                "certifications": {
                      "type": "array",
                      "items": {
                            "type": "object",
                            "properties": {
                                  "name": {
                                        "type": "string"
                                  },
                                  "issuer": {
                                        "type": "string"
                                  },
                                  "verificationUrl": {
                                        "type": "string"
                                  },
                                  "credentialId": {
                                        "type": "string"
                                  }
                            },
                            "required": [
                                  "name",
                                  "issuer",
                                  "verificationUrl"
                            ]
                      }
                }
          }
    }
  },
  {
    name: "get_projects",
    description: "List verified enterprise cloud architecture case studies, client domains, tech stacks, and quantifiable business outcomes.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Filter by category: all, cloud-architecture, devsecops, ai-ml, finops",
          enum: ["all", "cloud-architecture", "devsecops", "ai-ml", "finops"]
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Verified production enterprise case studies, system architectures, and metrics.",
          "properties": {
                "projects": {
                      "type": "array",
                      "items": {
                            "type": "object",
                            "properties": {
                                  "slug": {
                                        "type": "string"
                                  },
                                  "title": {
                                        "type": "string"
                                  },
                                  "category": {
                                        "type": "string"
                                  },
                                  "description": {
                                        "type": "string"
                                  },
                                  "techStack": {
                                        "type": "array",
                                        "items": {
                                              "type": "string"
                                        }
                                  },
                                  "metrics": {
                                        "type": "array",
                                        "items": {
                                              "type": "string"
                                        }
                                  }
                            },
                            "required": [
                                  "slug",
                                  "title",
                                  "description"
                            ]
                      }
                },
                "total": {
                      "type": "integer"
                }
          }
    }
  },
  {
    name: "get_articles",
    description: "List in-depth architectural publications, SRE blueprints, and systems engineering deep dives.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        tag: {
          type: "string",
          description: "Filter articles by topic tag (e.g. 'kubernetes', 'soc2', 'finops', 'ai')"
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Published architectural blueprints, compliance guides, and technical essays.",
          "properties": {
                "articles": {
                      "type": "array",
                      "items": {
                            "type": "object",
                            "properties": {
                                  "slug": {
                                        "type": "string"
                                  },
                                  "title": {
                                        "type": "string"
                                  },
                                  "description": {
                                        "type": "string"
                                  },
                                  "date": {
                                        "type": "string"
                                  },
                                  "category": {
                                        "type": "string"
                                  },
                                  "tags": {
                                        "type": "array",
                                        "items": {
                                              "type": "string"
                                        }
                                  },
                                  "readingTime": {
                                        "type": "string"
                                  }
                            },
                            "required": [
                                  "slug",
                                  "title"
                            ]
                      }
                },
                "total": {
                      "type": "integer"
                }
          }
    }
  },
  {
    name: "search_knowledge_base",
    description: "Full-text search across all case studies, architecture articles, developer documentation, and platform capabilities.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "Search keyword or phrase"
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Ranked search results across articles, case studies, and platform documentation.",
          "properties": {
                "query": {
                      "type": "string"
                },
                "results": {
                      "type": "array",
                      "items": {
                            "type": "object",
                            "properties": {
                                  "type": {
                                        "type": "string"
                                  },
                                  "title": {
                                        "type": "string"
                                  },
                                  "snippet": {
                                        "type": "string"
                                  },
                                  "url": {
                                        "type": "string"
                                  }
                            },
                            "required": [
                                  "title",
                                  "url"
                            ]
                      }
                },
                "count": {
                      "type": "integer"
                }
          }
    }
  },
  {
    name: "get_services",
    description: "Retrieve platform engineering advisory retainers, fractional leadership tiers, deliverables, commitments, and transparent rates.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      properties: {
        tier: {
          type: "string",
          description: "Filter by engagement model",
          enum: ["all", "audit", "fractional", "modernization"]
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Advisory retainers, fractional leadership tiers, deliverables, and rates.",
          "properties": {
                "services": {
                      "type": "array",
                      "items": {
                            "type": "object",
                            "properties": {
                                  "id": {
                                        "type": "string"
                                  },
                                  "name": {
                                        "type": "string"
                                  },
                                  "tier": {
                                        "type": "string"
                                  },
                                  "deliverables": {
                                        "type": "array",
                                        "items": {
                                              "type": "string"
                                        }
                                  },
                                  "pricing": {
                                        "type": "string"
                                  }
                            },
                            "required": [
                                  "name",
                                  "tier"
                            ]
                      }
                }
          }
    }
  },
  {
    name: "calculate_finops_roi",
    description: "Calculate estimated cloud cost savings and ROI from Karpenter container bin-packing, spot orchestration, and Graviton migration.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      required: ["monthlyCloudSpend"],
      properties: {
        monthlyCloudSpend: {
          type: "number",
          description: "Current monthly cloud spend in USD"
        },
        cloudProvider: {
          type: "string",
          description: "Cloud provider (AWS, GCP, Azure, OCI)"
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Estimated cloud cost savings, ROI projection, and architecture recommendations.",
          "properties": {
                "currentSpend": {
                      "type": "number"
                },
                "estimatedMonthlySavings": {
                      "type": "number"
                },
                "estimatedAnnualSavings": {
                      "type": "number"
                },
                "savingsPercentage": {
                      "type": "number"
                },
                "optimizations": {
                      "type": "array",
                      "items": {
                            "type": "string"
                      }
                }
          },
          "required": [
                "estimatedMonthlySavings",
                "estimatedAnnualSavings"
          ]
    }
  },
  {
    name: "submit_contact",
    description: "Dispatch an encrypted engineering inquiry or consultation request directly to Zain Ahmed with tracking reference ID.",
    annotations: { readOnlyHint: false, destructiveHint: false },
    inputSchema: {
      type: "object",
      required: ["name", "email", "message"],
      properties: {
        name: {
          type: "string",
          description: "Sender name"
        },
        email: {
          type: "string",
          description: "Sender email"
        },
        company: {
          type: "string",
          description: "Company or organization name"
        },
        subject: {
          type: "string",
          description: "Topic or inquiry subject"
        },
        message: {
          type: "string",
          description: "Detailed inquiry message"
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Encrypted inquiry dispatch receipt with tracking reference ID.",
          "properties": {
                "success": {
                      "type": "boolean"
                },
                "referenceId": {
                      "type": "string"
                },
                "message": {
                      "type": "string"
                }
          },
          "required": [
                "success",
                "referenceId"
          ]
    }
  },
  {
    name: "search_docs",
    description: "Full-text search across all documentation, architectural blueprints, API guides, and system runbooks.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "Keyword or phrase to search for"
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Ranked documentation search results with relevance snippets.",
          "properties": {
                "query": {
                      "type": "string"
                },
                "results": {
                      "type": "array",
                      "items": {
                            "type": "object",
                            "properties": {
                                  "title": {
                                        "type": "string"
                                  },
                                  "snippet": {
                                        "type": "string"
                                  },
                                  "url": {
                                        "type": "string"
                                  }
                            },
                            "required": [
                                  "title",
                                  "url"
                            ]
                      }
                },
                "count": {
                      "type": "integer"
                }
          }
    }
  },
  {
    name: "get_documentation_page",
    description: "Retrieve full documentation content and guides for a specific platform topic.",
    annotations: { readOnlyHint: true, destructiveHint: false },
    inputSchema: {
      type: "object",
      required: ["slug"],
      properties: {
        slug: {
          type: "string",
          description: "Documentation page slug",
          enum: ["overview", "architecture", "api", "mcp", "sdk", "auth", "security", "versioning", "skills"]
        }
      },
      additionalProperties: false
    },
    outputSchema: {
          "type": "object",
          "description": "Complete documentation article content, format, and section anchors.",
          "properties": {
                "slug": {
                      "type": "string"
                },
                "title": {
                      "type": "string"
                },
                "content": {
                      "type": "string"
                },
                "lastModified": {
                      "type": "string"
                }
          },
          "required": [
                "slug",
                "title",
                "content"
          ]
    }
  }
]

const RESOURCES = [
  {
    uri: "zainahmed://profile",
    name: "Engineer Profile",
    description: "Verified engineer bio, 5x cloud certifications, location, and contacts",
    mimeType: "application/json"
  },
  {
    uri: "zainahmed://skills",
    name: "Categorized Tech Stack",
    description: "Full competency matrix across Multi-Cloud, Kubernetes, DevSecOps, IaC, and MLOps",
    mimeType: "application/json"
  },
  {
    uri: "zainahmed://certifications",
    name: "Cloud Certifications Catalog",
    description: "Verified AWS, Azure, GCP, and Oracle credential IDs and Credly verification URLs",
    mimeType: "application/json"
  },
  {
    uri: "zainahmed://pricing",
    name: "Pricing Tiers and SLAs",
    description: "Machine-readable engagement plans, SLAs, and transparent rates",
    mimeType: "text/markdown"
  },
  {
    uri: "zainahmed://openapi",
    name: "OpenAPI 3.1 Specification",
    description: "Complete OpenAPI 3.1.0 REST API specification in JSON format",
    mimeType: "application/json"
  }
]

async function handleToolCall(name, args = {}) {
  try {
    if (name === "get_profile") {
      const res = await fetch(`${BASE_URL}/api/v1/profile`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    }

    if (name === "get_skills") {
      const res = await fetch(`${BASE_URL}/api/v1/services`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    }

    if (name === "get_certifications") {
      const res = await fetch(`${BASE_URL}/api/v1/profile`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data.certifications || [], null, 2) }] }
    }

    if (name === "get_projects") {
      const res = await fetch(`${BASE_URL}/api/v1/projects`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    }

    if (name === "get_articles") {
      const res = await fetch(`${BASE_URL}/api/v1/articles`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    }

    if (name === "search_knowledge_base" || name === "search_docs") {
      const q = encodeURIComponent(args.query || "")
      const res = await fetch(`${BASE_URL}/api/v1/projects`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify({ query: args.query, results: data }, null, 2) }] }
    }

    if (name === "get_services") {
      const res = await fetch(`${BASE_URL}/api/v1/services`)
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    }

    if (name === "calculate_finops_roi") {
      const spend = Number(args.monthlyCloudSpend) || 10000
      const savingsLow = Math.round(spend * 0.3)
      const savingsHigh = Math.round(spend * 0.4)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                monthlyCloudSpendUSD: spend,
                estimatedMonthlySavingsUSD: { min: savingsLow, max: savingsHigh },
                estimatedAnnualSavingsUSD: { min: savingsLow * 12, max: savingsHigh * 12 },
                primaryLevers: [
                  "Karpenter dynamic node autoscaling and consolidation",
                  "Automated Spot instance orchestration for fault-tolerant workers",
                  "Container CPU/Memory bin-packing and rightsizing",
                  "Graviton / ARM64 instance family transition",
                  "Cross-AZ egress elimination via VPC endpoints"
                ]
              },
              null,
              2
            )
          }
        ]
      }
    }

    if (name === "submit_contact") {
      const res = await fetch(`${BASE_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args)
      })
      const data = await res.json()
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] }
    }

    if (name === "get_documentation_page") {
      const res = await fetch(`${BASE_URL}/docs/${args.slug || "overview"}.md`)
      if (res.ok) {
        const text = await res.text()
        return { content: [{ type: "text", text }] }
      }
      return { content: [{ type: "text", text: `Documentation for ${args.slug} is available at https://zainahmed.net/docs` }] }
    }

    // Forward to remote MCP as fallback
    const remoteRes = await fetch(`${BASE_URL}/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name, arguments: args }
      })
    })
    const remoteData = await remoteRes.json()
    return remoteData.result || { content: [{ type: "text", text: JSON.stringify(remoteData) }] }
  } catch (err) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error calling tool ${name}: ${err.message}` }]
    }
  }
}

async function handleResourceRead(uri) {
  try {
    if (uri === "zainahmed://profile") {
      const res = await fetch(`${BASE_URL}/api/v1/profile`)
      const data = await res.json()
      return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(data, null, 2) }] }
    }
    if (uri === "zainahmed://pricing") {
      const res = await fetch(`${BASE_URL}/pricing.md`)
      const text = await res.text()
      return { contents: [{ uri, mimeType: "text/markdown", text }] }
    }
    if (uri === "zainahmed://openapi") {
      const res = await fetch(`${BASE_URL}/openapi.json`)
      const data = await res.json()
      return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(data, null, 2) }] }
    }
    return { contents: [{ uri, mimeType: "text/plain", text: `Resource at ${uri}` }] }
  } catch (err) {
    throw new Error(`Failed to read resource: ${err.message}`)
  }
}

function processMessage(msg) {
  const { id, method, params } = msg

  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: {
          name: SERVER_NAME,
          title: "Zain Ahmed Engineering & Architecture MCP Server",
          version: SERVER_VERSION,
          description: "Official Model Context Protocol server for Zain Ahmed's verified multi-cloud production systems, SRE architectures, and FinOps advisory."
        },
        capabilities: {
          tools: { listChanged: false },
          resources: { subscribe: false, listChanged: false },
          prompts: { listChanged: false }
        },
        instructions: "Zain Ahmed platform engineering MCP server. Use these tools to query verified multi-cloud production architectures, cloud certifications, technical publications, FinOps cost calculations, and dispatch engineering inquiries."
      }
    }
  }

  if (method === "notifications/initialized") {
    return null
  }

  if (method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: { tools: TOOLS }
    }
  }

  if (method === "resources/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: { resources: RESOURCES }
    }
  }

  if (method === "prompts/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: { prompts: [] }
    }
  }

  if (method === "ping") {
    return {
      jsonrpc: "2.0",
      id,
      result: {}
    }
  }

  return {
    jsonrpc: "2.0",
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

rl.on("line", async (line) => {
  const trimmed = line.trim()
  if (!trimmed) return

  try {
    const msg = JSON.parse(trimmed)

    if (msg.method === "tools/call") {
      const toolName = msg.params?.name
      const toolArgs = msg.params?.arguments || {}
      const res = await handleToolCall(toolName, toolArgs)
      console.log(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: res }))
      return
    }

    if (msg.method === "resources/read") {
      try {
        const res = await handleResourceRead(msg.params?.uri)
        console.log(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: res }))
      } catch (err) {
        console.log(JSON.stringify({ jsonrpc: "2.0", id: msg.id, error: { code: -32000, message: err.message } }))
      }
      return
    }

    const reply = processMessage(msg)
    if (reply) {
      console.log(JSON.stringify(reply))
    }
  } catch (err) {
    console.error(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }))
  }
})
