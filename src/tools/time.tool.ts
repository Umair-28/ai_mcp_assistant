import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { timeSchema } from "../schema/time.schema.js";

export const registerTimeTool = (server: McpServer): void => {
  server.registerTool(
    "get_current_time",
    {
      title: "Get Current Time",
      description: "Get current system time",
    },
    async () => {
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());

      const result = {
        time,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_timezone_time",
    {
      title: "Get Timezone Time",
      description:
        "Get the current time for a specific IANA timezone such as Asia/Karachi",
      inputSchema: timeSchema,
    },
    async ({ timezone }) => {
      try {
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());

        const result = {
          time,
          timezone,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Invalid timezone: ${timezone}`,
              }),
            },
          ],
          isError: true,
        };
      }
    }
  );
};
