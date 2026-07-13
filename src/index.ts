import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { registerTimeTool } from "./tools/time.tool.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

const server = new McpServer({
    name:"time-server",
    version:"1.0.0."
})

registerTimeTool(server)

async function main(): Promise<void> {
    const transport = new StdioServerTransport;
  
    await server.connect(transport);
  
    console.error("Time MCP Server running over stdio");
  }
  
  main().catch((error: unknown) => {
    console.error("Fatal MCP Server error:", error);
    process.exit(1);
  });
