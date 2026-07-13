import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({
  name: "time-test-client",
  version: "1.0.0",
});

async function main(): Promise<void> {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "src/index.ts"],
  });

  await client.connect(transport);

  console.log("Connected to Time MCP Server");

  const tools = await client.listTools();

  console.log("\nAvailable tools:");
  console.dir(tools, {
    depth: null,
  });

  //   const result = await client.callTool({
  //     name: "get_current_time",
  //     arguments: {},
  //   });

  const result = await client.callTool({
    name: "get_timezone_time",
    arguments: {
      timezone: "Asia/Karachi",
    },
  });

  console.log("\nTool result:");
  console.dir(result, {
    depth: null,
  });

  await client.close();
}

main().catch((error: unknown) => {
  console.error("MCP Client error:", error);
  process.exit(1);
});
